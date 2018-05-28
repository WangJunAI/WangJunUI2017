using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        public static EntityDbContext<T> GetInstance<T>() where T : class,new()
        {
            var context = EntityDbContext<T>.CreateInstance(@"Data Source=192.168.0.150\SQL2016;Initial Catalog=WangJun;Persist Security Info=True;User ID=sa;Password=111qqq!!!");
            return context;
        }

        public int Save<T>(T item) where T : class,/* IRelationshipGuid, IName, ITime, IRelationshipObjectId, IStatus, IOperator, IApp, ISysItem,*/ICompany , new()
        {
            var db = DataStorage.GetInstance(DBType.MongoDB);
            var iRelationshipObjectId = item as IRelationshipObjectId;

            var iSysItem = item as ISysItem;
            #region ISysItem
            if (null != iSysItem && !string.IsNullOrWhiteSpace(iSysItem._DbName) && !string.IsNullOrWhiteSpace(iSysItem._CollectionName))
            {
                var query = MongoDBFilterCreator.SearchByObjectId(iRelationshipObjectId.ID);
                db.Save3(iSysItem._DbName, iSysItem._CollectionName, item, query);
            }
            #endregion

            EntityManager.GetInstance<T>().Save(item);

            return 0;
        }

        /// <summary>
        /// 旧代码应该作废
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
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

        public int Remove<T>(string id) where T : class,/* IRelationshipGuid, IName, ITime, IRelationshipObjectId, IStatus, IOperator, IApp, ISysItem, */ICompany, new()
        {
            var item = new T() {};
            var iRelationshipObjectId = item as IRelationshipObjectId;
            var iSysItem = item as ISysItem;
            iRelationshipObjectId.ID = id;
            if (null != iRelationshipObjectId && null != iSysItem && StringChecker.IsNotEmptyObjectId(iRelationshipObjectId.ID))
            { 
                var db = DataStorage.GetInstance(DBType.MongoDB);

                var query = MongoDBFilterCreator.SearchByObjectId(iRelationshipObjectId.ID);
                db.Save3(iSysItem._DbName, iSysItem._CollectionName, "{StatusCode:" + CONST.APP.Status.删除 + ",Status:'" + CONST.APP.Status.GetString(CONST.APP.Status.删除) + "'}", query, false);


                var res = EntityManager.GetInstance<T>().List.Find(new object[] { id });
                if (null != res) {
                    (res as IStatus).StatusCode =(int) EnumEntity.删除;
                    (res as IStatus).Status = EnumEntity.删除.ToString();
                    EntityManager.GetInstance<T>().Save(res);
                }
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

        /// <summary>
        /// 旧代码应该作废
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="item"></param>
        /// <returns></returns>
        public T Get<T>(BaseItem item) where T : class, new()
        {



            return this.Get<T>(item.ID);
            if (StringChecker.IsNotEmptyObjectId(item.ID))
            {
                var db = DataStorage.GetInstance(DBType.MongoDB);
                var query = MongoDBFilterCreator.SearchByObjectId(item.ID);
                var data = db.Get(item._DbName, item._CollectionName, query);


                return Convertor.FromDictionaryToObject<T>(data);
            }
            return new T();
        }

        /// <summary>
        /// 统一Get
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>
        public T Get<T>(string id) where T : class, new()
        {
            var inst = new T();
            var iSystem = inst as ISysItem;
            if (!StringChecker.IsZeroString(id))
            {
                var db = DataStorage.GetInstance(DBType.MongoDB);
                var query = MongoDBFilterCreator.SearchByObjectId(id);
                var data = db.Get(iSystem._DbName, iSystem._CollectionName, query);

                var res = EntityManager.GetInstance<T>().Get(id);

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

        public List<T> Find<T>(Expression<Func<T,bool>> where,Expression<Func<T, DateTime>> orderBy,int pageIndex,int pageSize,bool isDes) where T : class, new()
        {
            var tplItem = new T() as BaseItem;
            var list = new List<T>();

            EntityManager.GetInstance<T>().List.Where(where).OrderBy(orderBy).Skip(pageIndex * pageSize).Take(pageSize);

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
