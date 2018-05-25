using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Config;
using WangJun.DB;
using WangJun.Utility;

namespace WangJun.Entity
{
    public class EntityManager
    {

        public static EntityManager GetInstance()
        {
            var inst = new EntityManager();
            return inst;
        }

        public static EntityDbContext<T> GetInstance<T>() where T : class
        {
            var context = EntityDbContext<T>.CreateInstance(@"Data Source=192.168.0.150\SQL2016;Initial Catalog=WangJun;Persist Security Info=True;User ID=sa;Password=111qqq!!!");
            return context;
        }

        public int Save<T>(T item) where T : class, IRelationshipGuid, IName, ITime, IRelationshipObjectId, IStatus, IOperator, IApp, ISysItem, ICompany, new()
        {
            var inst = item as T;
            var db = DataStorage.GetInstance(DBType.MongoDB);
            var session = SESSION.Current;
            var iRelationshipObjectId = item as IRelationshipObjectId;
            var iTime = item as ITime;
            var iOperator = item as IOperator;
            var iCompany = item as ICompany;
            var iStatus = item as IStatus;

            #region iRelationshipObjectId
            if (null != iRelationshipObjectId && iRelationshipObjectId._OID == ObjectId.Empty) ///新对象
            {
                iRelationshipObjectId._OID = ObjectId.GenerateNewId();

            }
            #endregion

            #region ITime
            if (null != iTime && item.CreateTime == DateTime.MinValue) ///新对象
            {
                item.CreateTime = DateTime.Now.AddDays(new Random().Next(-90, 0));
                item.UpdateTime = DateTime.Now;

            }
            #endregion

            #region IOperator
            if (null != iOperator && string.IsNullOrWhiteSpace(item.CreatorID)) ///新对象
            { 
                item.CreatorID = session.UserID;
                item.CreatorName = session.UserName;
                item.ModifierID = session.UserID;
                item.ModifierName = session.UserName;
                if (StringChecker.IsZeroString(item.OwnerID)) ///企业的应该界面赋值
                {
                    item.OwnerID = session.UserID; ///数据所有者
                }
            }
            #endregion

            #region ICompany
            if (null != iCompany && string.IsNullOrWhiteSpace(item.CompanyID))
            {
                item.CompanyID = session.CompanyID;
                item.CompanyName = session.CompanyName;
            }
            #endregion

            #region IStatus
            if (null != iStatus && string.IsNullOrWhiteSpace(item.Status))
            {
                item.StatusCode = (int)EnumEntity.正常;
                item.Status = EnumEntity.正常.ToString();
            }
            #endregion

            if (null != iRelationshipObjectId && iRelationshipObjectId._OID == ObjectId.Empty) ///新对象
            {
                item.CreateTime = DateTime.Now.AddDays(new Random().Next(-90, 0));
                item.UpdateTime = DateTime.Now;


                item.CompanyID = session.CompanyID;
                item.CompanyName = session.CompanyName;
                //item.Status = CONST.Status.Normal;
                if (!StringChecker.IsNotEmptyObjectId(item.OwnerID)) ///默认指定则不赋值
                {
                    item.OwnerID = session.UserID; ///数据所有者
                }

                db.Save3(item._DbName, item._CollectionName, inst);
            }
            else
            {
                var query = MongoDBFilterCreator.SearchByObjectId(item.ID);
                db.Save3(item._DbName, item._CollectionName, inst, query);
            }
            return 0;
        }

        public int Remove(BaseItem item)
        {
            if (StringChecker.IsNotEmptyObjectId(item.ID))
            {
                var db = DataStorage.GetInstance(DBType.MongoDB);
                var query = MongoDBFilterCreator.SearchByObjectId(item.ID);
                db.Save3(item._DbName, item._CollectionName, "{StatusCode:" + CONST.APP.Status.删除 + ",Status:'" + CONST.APP.Status.GetString(CONST.APP.Status.删除) + "'}", query, false);
                ClientBehaviorItem.Save(item, ClientBehaviorItem.BehaviorType.移除, SESSION.Current);

            }
            return 0;
        }

        public int Delete(BaseItem item)
        {
            if (StringChecker.IsNotEmptyObjectId(item.ID))
            {
                var db = DataStorage.GetInstance(DBType.MongoDB);
                var query = MongoDBFilterCreator.SearchByObjectId(item.ID);
                db.Remove(item._DbName, item._CollectionName, query);
                ClientBehaviorItem.Save(item, ClientBehaviorItem.BehaviorType.删除, SESSION.Current);

            }
            return 0;
        }

        public T Get<T>(BaseItem item) where T : class, new()
        {
            if (StringChecker.IsNotEmptyObjectId(item.ID))
            {
                var db = DataStorage.GetInstance(DBType.MongoDB);
                var query = MongoDBFilterCreator.SearchByObjectId(item.ID);
                var data = db.Get(item._DbName, item._CollectionName, query);


                return Convertor.FromDictionaryToObject<T>(data);
            }
            return new T();
        }

        public T Get<T>(string dbName, string collectionName, string query) where T : class, new()
        {

            var db = DataStorage.GetInstance(DBType.MongoDB);
            var data = db.Get(dbName, collectionName, query);

            return Convertor.FromDictionaryToObject<T>(data);

        }

        public List<T> Find<T>(string dbName, string collectionName, string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50) where T : class, new()
        {
            var list = new List<T>();
            if (!string.IsNullOrWhiteSpace(query))
            {
                var mongo = DataStorage.GetInstance(DBType.MongoDB);
                var resList = mongo.Find3(dbName, collectionName, query, sort, protection, pageIndex, pageSize);

                list = Convertor.FromDictionaryToObject<T>(resList);

            }

            return list;
        }

        public List<T> Find<T>(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50) where T : class, new()
        {
            var tplItem = new T() as BaseItem;
            var list = new List<T>();
            if (!string.IsNullOrWhiteSpace(query))
            {
                var mongo = DataStorage.GetInstance(DBType.MongoDB);
                var resList = mongo.Find3(tplItem._DbName, tplItem._CollectionName, query, sort, protection, pageIndex, pageSize);

                list = Convertor.FromDictionaryToObject<T>(resList);
            }

            return list;
        }
        /// <summary>
        /// {$match:{}},{$group:{_id:"计数",Count:{$sum:1}}}
        /// </summary>
        /// <param name="dbName"></param>
        /// <param name="collectionName"></param>
        /// <param name="match"></param>
        /// <param name="group"></param>
        /// <returns></returns>

        public object Aggregate(string dbName, string collectionName, string match, string group)
        {
            var db = DataStorage.GetInstance(DBType.MongoDB);
            return db.Aggregate(dbName, collectionName, match, group);
        }

        /// <summary>
        /// 更改状态
        /// </summary>
        /// <param name="newStatusCode">状态码</param>
        /// <returns></returns>
        public object UpdateField<T>(string jsonString, string query) where T : class, new()
        {
            var item = new T() as BaseItem;
            if (null != item)
            {
                var db = DataStorage.GetInstance(DBType.MongoDB);
                db.Save3(item._DbName, item._CollectionName, jsonString, query, false);

                return 0;
            }
            return null;
        }


    }
}
