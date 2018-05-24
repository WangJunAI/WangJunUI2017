using System.Collections.Generic;
using System.Linq;
using WangJun.Config;
using WangJun.Entity;
using WangJun.Utility;
using WangJun.Yun;

namespace WangJun.YunNews
{
    /// <summary>
    /// 
    /// </summary>
    public class YunNewsWebAPI:IApp,ISysItem
    { 

        #region  IApp
        public long Version { get { return 1; } set { } }

        public string AppName { get { return CONST.APP.YunNews.Name; } set { } }

        public long AppCode { get { return CONST.APP.YunNews.Code; } set { } }
        #endregion

        public T GetInterface<T>() where T : class
        {
            return (this as T);
        }

        #region ISysItem
        public string ClassFullName { get; set; }

        public string _DbName { get; set; }

        public string _CollectionName { get; set; }

        public string _SourceID { get; set; }

        #endregion
 


        #region 目录操作
        /// <summary>
        /// 保存一个目录
        /// </summary>
        /// <param name="name"></param>
        /// <param name="parentId"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public int SaveCategory(string jsonInput)
        {
            ///MongoDB
            CategoryItem.Save(jsonInput);

            /// SQLServer
            var ar = Convertor.FromJsonToObject2<YunCategory>(jsonInput);
            ar.AppCode = this.GetInterface<IApp>().AppCode;
            ar.AppName = this.GetInterface<IApp>().AppName;
            ar.Version = this.GetInterface<IApp>().Version;
             
            ar.Save();

            return 0;
        }

        /// <summary>
        /// 加载目录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="protection"></param>
        /// <param name="sort"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public List<CategoryItem> LoadCategoryList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            var dict = Convertor.FromJsonToDict2(query);
 
                query = "{$and:[" + query + ",{'CompanyID':'" + SESSION.Current.CompanyID + "','AppCode':" + this.AppCode + "},{'StatusCode':{$ne:" + CONST.APP.Status.删除 + "}}]}";

            ///MongoDB
            var res = EntityManager.GetInstance().Find<CategoryItem>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance<YunCategory>().List.Where(p=>p.CompanyID == SESSION.Current.CompanyID&& p.AppCode == this.AppCode).ToList();
            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveCategory(string id)
        {
            ///MongoDB
            var inst = new CategoryItem();
            inst.ID = id;
            inst.Remove();

            /// SQLServer
            YunCategory.Load(1).Remove();
            return 0;
        }

        public CategoryItem GetCategory(string id)
        {
            ///MongoDB
            var inst = new CategoryItem();
            inst.ID = id;
            inst = EntityManager.GetInstance().Get<CategoryItem>(inst);

            /// SQLServer
            var yc = YunCategory.Load(2);

            return inst;
        }

        #endregion

        #region 文档操作
        /// <summary>
        /// 保存一个目录
        /// </summary>
        /// <param name="name"></param>
        /// <param name="parentId"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public int SaveEntity(string jsonInput)
        {
            ///MongoDB
            YunNewsItem.Save(jsonInput);

            /// SQLServer
            var ar = Convertor.FromJsonToObject2<YunArticle>(jsonInput);
            ar.AppCode = this.GetInterface<IApp>().AppCode;
            ar.AppName = this.GetInterface<IApp>().AppName;
            ar.Version = this.GetInterface<IApp>().Version;
            ar.Save();

            return 0;
        }

        /// <summary>
        /// 加载目录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="protection"></param>
        /// <param name="sort"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public List<YunNewsItem> LoadEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            ///MongoDB
            query = "{$and:[" + query + ",{'StatusCode':{$ne:" + CONST.APP.Status.删除 + "}}]}";
            var res = EntityManager.GetInstance().Find<YunNewsItem>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance<YunArticle>().List.Where(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode).Skip(pageIndex * pageSize).Take(pageSize).ToList();

            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveEntity(string id)
        {
            ///MongoDB
            var inst = new YunNewsItem();
            inst.ID = id;
            inst.Remove();

            /// SQLServer
            YunCategory.Load(1).Remove();

            return 0;
        }

        public YunNewsItem GetEntity(string id)
        {
            ///MongoDB
            var inst = new YunNewsItem();
            inst.ID = id;
            inst = EntityManager.GetInstance().Get<YunNewsItem>(inst);

            /// SQLServer
            var yc = YunArticle.Load(2);
            return inst;
        }
        #endregion

        #region 评论操作
        /// <summary>
        /// 保存一个目录
        /// </summary>
        /// <param name="name"></param>
        /// <param name="parentId"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public int SaveComment(string jsonInput)
        {
            var dict = Convertor.FromJsonToDict2(jsonInput);
            ///MongoDB
            CommentItem.Save(jsonInput);

            ///SQLServer
            YunComment.CreateAsText(this, dict["Content"].ToString(), this).Save();

            return 0;
        }

        /// <summary>
        /// 加载目录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="protection"></param>
        /// <param name="sort"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public List<CommentItem> LoadCommentList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            query = "{$and:[" + query + ",{'StatusCode':{$ne:" + CONST.APP.Status.删除 + "}}]}";
            var res = EntityManager.GetInstance().Find<CommentItem>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance<YunComment>().List.Where(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode).Skip(pageIndex * pageSize).Take(pageSize).ToList();


            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveComment(string id)
        {
            ///MongoDB
            var inst = new CommentItem();
            inst.ID = id;
            inst.Remove();

            /// SQLServer
            YunComment.Load(1).Remove();

            return 0;
        }

        public CommentItem GetComment(string id)
        {
            ///MongoDB
            var inst = new CommentItem();
            inst.ID = id;
            inst = EntityManager.GetInstance().Get<CommentItem>(inst);


            /// SQLServer
            var yc = YunComment.Load(2);

            return inst;
        }
        #endregion


        #region 统计操作
        /// <summary>
        /// 统计操作
        /// </summary>
        /// <returns></returns>
        public object Count(string json)
        {
            ///MongoDB
            var item = new YunNewsItem();
            var match = "{$match:" + json + "}";
            var group = "{$group:{_id:'YunNewsItem总数',Count:{$sum:1}}}";
            var res = EntityManager.GetInstance().Aggregate(item._DbName, item._CollectionName, match, group);

            /// SQLServer
            var res2 = EntityManager.GetInstance<YunArticle>().List.Where(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode).Count();
            return res;
        }
        #endregion

        #region 回收站
        public List<YunNewsItem> LoadRecycleBinEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            ///MongoDB
            query = "{$and:[" + "{}" + ",{'OwnerID':'" + SESSION.Current.UserID + "','AppCode':" + this.AppCode + "},{'StatusCode':{$eq:" + CONST.APP.Status.删除 + "}}]}";
            var res = EntityManager.GetInstance().Find<YunNewsItem>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance<YunArticle>().List.Where(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode).Skip(pageIndex * pageSize).Take(pageSize).ToList();

            return res;
             
        }

        /// <summary>
        /// 彻底删除实体
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteEntity(string id)
        {
            ///MongoDB
            var inst = new YunNewsItem();
            inst.ID = id;
            inst.Delete();

            /// SQLServer
            YunArticle.Load(1).Remove();

            return 0;
        }

        public int EmptyRecycleBin()
        {
            var list = this.LoadRecycleBinEntityList("{}", "{}", "{}", 0, int.MaxValue);
            foreach (YunNewsItem item in list)
            {
                item.Delete();
            }

            /// SQLServer
            YunArticle.Load(1).Remove();

            return 0;
        }
        #endregion


        #region 聚合计算
        public object Aggregate(string itemType, string match, string group)
        {
            var item = new BaseItem();
            if ("Entity" == itemType)
            {
                item = new YunNewsItem();
            }
            else if ("Category" == itemType)
            {
                item = new CategoryItem();
            }
            var res = EntityManager.GetInstance().Aggregate(item._DbName, item._CollectionName, match, group);
            return res;

        }
        #endregion


        #region 用户行为
        /// <summary>
        /// 添加点赞行为
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public object AddLikeCount(string id)
        {

            var existQuery = "{'UserID':ObjectId('[1]'),'DbID':ObjectId('[2]'),'BehaviorCode': [3]}".Replace("[1]",SESSION.Current.UserID).Replace("[2]",id).Replace("[3]", ClientBehaviorItem.BehaviorType.点赞.ToString());

            var res = EntityManager.GetInstance().Get<ClientBehaviorItem>("WangJun", "ClientBehavior", existQuery);
            var count = 0;

            if (null != res &&!res.IsEmpty) ///若数据有效
            {
                ///删除点赞记录
                ///修改文档统计
                res.Remove();
                count = -1;
            }
            else
            {
                var inst = new YunNewsItem();
                inst.ID = id;
                ClientBehaviorItem.Save(inst, ClientBehaviorItem.BehaviorType.点赞, SESSION.Current);
                count = 1;
            }

            var query = MongoDBFilterCreator.SearchByObjectId(id);
            var updateJson = MongoDBFilterCreator.ByInc("LikeCount", count);
            EntityManager.GetInstance().UpdateField<YunNewsItem>(updateJson, query);
            return 0;
        }

        /// <summary>
        /// 添加收藏行为
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public object AddFavoriteCount(string id)
        {
            var existQuery = "{'UserID':ObjectId('[1]'),'DbID':ObjectId('[2]'),'BehaviorCode': [3]}".Replace("[1]", SESSION.Current.UserID).Replace("[2]", id).Replace("[3]", ClientBehaviorItem.BehaviorType.收藏.ToString());

            var res = EntityManager.GetInstance().Get<ClientBehaviorItem>("WangJun", "ClientBehavior", existQuery);
            var count = 0;

            if (null != res && !res.IsEmpty) ///若数据有效
            {
                ///删除收藏记录
                ///修改文档统计
                res.Remove();
                count = -1;
            }
            else
            {
                var inst = new YunNewsItem();
                inst.ID = id;
                ClientBehaviorItem.Save(inst, ClientBehaviorItem.BehaviorType.收藏, SESSION.Current);
                count = 1;
            }

            var query = MongoDBFilterCreator.SearchByObjectId(id);
            var updateJson = MongoDBFilterCreator.ByInc("FavoriteCount", count);
            EntityManager.GetInstance().UpdateField<YunNewsItem>(updateJson, query);
            return 0;
        }

        public object GetBehaviorCount(string id)
        {
            var existQuery = "{'UserID':ObjectId('[1]'),'DbID':ObjectId('[2]'),'BehaviorCode':{{in:[[3],[4]]}}".Replace("[1]", SESSION.Current.UserID).Replace("[2]", id).Replace("[3]", ClientBehaviorItem.BehaviorType.收藏.ToString()).Replace("[4]", ClientBehaviorItem.BehaviorType.点赞.ToString());

            var res = EntityManager.GetInstance().Find<ClientBehaviorItem>("WangJun", "ClientBehavior", existQuery, "{}", "{}", 0, int.MaxValue);
            return res;
        }
        #endregion

        #region ClientRead
        public int ClientRead(string id)
        {
            var item = new YunNewsItem();
            item.ID = id;
            ClientBehaviorItem.Save(item, ClientBehaviorItem.BehaviorType.阅读, SESSION.Current);
            return 0;
        }
        #endregion

        #region ClientRead
        public object GetBehaviorByArticleID(string id)
        {
            return ClientBehaviorItem.LoadByDBID(id);
        }
        #endregion

    }
}
