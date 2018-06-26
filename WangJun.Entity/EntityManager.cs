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
            var connStr = @"Data Source=hds260381389.my3w.com;Initial Catalog=hds260381389_db;Persist Security Info=True;User ID=hds260381389;Password=75737573";
            //var connStr = @"Data Source=192.168.0.150\SQL2016;Initial Catalog=WangJun;Persist Security Info=True;User ID=sa;Password=111qqq!!!";
            var context = EntityDbContext<T>.CreateInstance(connStr);
            return context;
        }


        /// <summary>
        /// 新版 多合一存储
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="item"></param>
        /// <returns></returns>
        public int Save<T>(T item) where T : class,/* IRelationshipGuid, IName, ITime, IRelationshipObjectId, IStatus, IOperator, IApp, ISysItem,*/ICompany , new()
        {
            var db = DataStorage.GetInstance(DBType.MongoDB); 
            var iSysItem = item as ISysItem;
            #region ISysItem
            if (null != iSysItem && !string.IsNullOrWhiteSpace(iSysItem._DbName) && !string.IsNullOrWhiteSpace(iSysItem._CollectionName))
            {
                var query = MongoDBFilterCreator.SearchByObjectId(iSysItem.ID);
                db.Save3(iSysItem._DbName, iSysItem._CollectionName, item, query);
            }
            #endregion

            EntityManager.GetInstance<T>().Save(item);

            return 0;
        }
         
        public int Remove<T>(string id) where T : class,/* IRelationshipGuid, IName, ITime, IRelationshipObjectId, IStatus, IOperator, IApp, ISysItem, */ICompany, new()
        {
            var item = new T() {};
             var iSysItem = item as ISysItem;
            iSysItem.ID = id;
            if (null != iSysItem && StringChecker.IsNotEmptyObjectId(iSysItem.ID))
            { 
                var db = DataStorage.GetInstance(DBType.MongoDB);

                var query = MongoDBFilterCreator.SearchByObjectId(iSysItem.ID);
                db.Save3(iSysItem._DbName, iSysItem._CollectionName, "{StatusCode:" + (int)EnumStatus.删除 + ",Status:'" + EnumStatus.删除.ToString() + "'}", query, false);


                var res = EntityManager.GetInstance<T>().List.Find(new object[] { SUID.FromStringToGuid(id) });
                if (null != res) {
                    (res as IStatus).StatusCode =(int) EnumStatus.删除;
                    (res as IStatus).Status = EnumStatus.删除.ToString();
                    EntityManager.GetInstance<T>().Save(res);
                }
            }
            return 0;
        }
        public int DeleteOne<T>(string id) where T : class,/* IRelationshipGuid, IName, ITime, IRelationshipObjectId, IStatus, IOperator, IApp, ISysItem, */ICompany, new()
        {
            var item = new T() { };
             var iSysItem = item as ISysItem;
            iSysItem.ID = id;
            if (null != iSysItem && StringChecker.IsNotEmptyObjectId(iSysItem.ID))
            {
                var db = DataStorage.GetInstance(DBType.MongoDB);

                var query = MongoDBFilterCreator.SearchByObjectId(iSysItem.ID);
                db.Remove(iSysItem._DbName, iSysItem._CollectionName , query );
                 
 
                EntityManager.GetInstance<T>().Remove(item);
 
            }
            return 0;
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
        public T Get<T>(Expression<Func<T, bool>> where) where T : class, new()
        {
            var res = EntityManager.GetInstance<T>().List.Where(where).Take(1);

            return res.FirstOrDefault();
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
            var iSysItem = new T() as ISysItem;
            var list = new List<T>();
            if (!string.IsNullOrWhiteSpace(query))
            {
                var mongo = DataStorage.GetInstance(DBType.MongoDB);
                var resList = mongo.Find3(iSysItem._DbName, iSysItem._CollectionName, query, sort, protection, pageIndex, pageSize);

                list = Convertor.FromDictionaryToObject<T>(resList);
            }

            return list;
        }

        public List<T> Find<T>(Expression<Func<T,bool>> where,Expression<Func<T, DateTime>> orderBy=null,int pageIndex=0,int pageSize=int.MaxValue,bool isDes=false) where T : class, new()
        {

            var list = new List<T>();
            return list;
            if (null == orderBy)
            {
                list = EntityManager.GetInstance<T>().List.Where(where).ToList();
            }
            else {
                list = EntityManager.GetInstance<T>().List.Where(where).OrderBy(orderBy).Skip(pageIndex * pageSize).Take(pageSize).ToList();
            }
           

            return list;
        }

        public bool IsExist<T>()
        {
            return false;
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

        public int Count<T>(Expression<Func<T, bool>> where) where T : class, new()
        {
            var count = EntityManager.GetInstance<T>().List.Where(where).Count();

            return count;
        }

        /// <summary>
        /// 更改状态
        /// </summary>
        /// <param name="newStatusCode">状态码</param>
        /// <returns></returns>
        public object UpdateField<T>(string jsonString, string query) where T : class, new()
        {
            var item = new T() as ISysItem;
            if (null != item)
            {
                var db = DataStorage.GetInstance(DBType.MongoDB);
                db.Save3(item._DbName, item._CollectionName, jsonString, query, false);

                return 0;
            }
            return null;
        }

        public string SaveFile(string sourceFileUrl, string fileName)
        {
            var db = DataStorage.GetInstance(DBType.MongoDB);
            return db.SaveFile(sourceFileUrl, fileName);
        }

    }
}
