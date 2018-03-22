﻿using System.Collections.Generic;
using WangJun.Config;
using WangJun.Entity;
using WangJun.Utility; 

namespace WangJun.YunNews
{
    /// <summary>
    /// 
    /// </summary>
    public class YunNewsWebAPI
    {
        public long AppCode = CONST.APP.YunNews.Code;


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
            CategoryItem.Save(jsonInput);
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
 
            var res = EntityManager.GetInstance().Find<CategoryItem>(query, protection, sort, pageIndex, pageSize);
            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveCategory(string id)
        {
            var inst = new CategoryItem();
            inst.ID = id;
            inst.Remove();
            return 0;
        }

        public CategoryItem GetCategory(string id)
        {
            var inst = new CategoryItem();
            inst.ID = id;
            inst = EntityManager.GetInstance().Get<CategoryItem>(inst);
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
            YunNewsItem.Save(jsonInput);
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
            query = "{$and:[" + query + ",{'StatusCode':{$ne:" + CONST.APP.Status.删除 + "}}]}";
            var res = EntityManager.GetInstance().Find<YunNewsItem>(query, protection, sort, pageIndex, pageSize);
            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveEntity(string id)
        {
            var inst = new YunNewsItem();
            inst.ID = id;
            inst.Remove();
            return 0;
        }

        public YunNewsItem GetEntity(string id)
        {
            var inst = new YunNewsItem();
            inst.ID = id;
            inst = EntityManager.GetInstance().Get<YunNewsItem>(inst);
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
            CommentItem.Save(jsonInput);
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
            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveComment(string id)
        {
            var inst = new CommentItem();
            inst.ID = id;
            inst.Remove();
            return 0;
        }

        public CommentItem GetComment(string id)
        {
            var inst = new CommentItem();
            inst.ID = id;
            inst = EntityManager.GetInstance().Get<CommentItem>(inst);
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
            var item = new YunNewsItem();
            var match = "{$match:" + json + "}";
            var group = "{$group:{_id:'YunNewsItem总数',Count:{$sum:1}}}";
            var res = EntityManager.GetInstance().Aggregate(item._DbName, item._CollectionName, match, group);
            return res;
        }
        #endregion

        #region 回收站
        public List<YunNewsItem> LoadRecycleBinEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            query = "{$and:[" + "{}" + ",{'OwnerID':'" + SESSION.Current.UserID + "','AppCode':" + this.AppCode + "},{'StatusCode':{$eq:" + CONST.APP.Status.删除 + "}}]}";
             
            var res = EntityManager.GetInstance().Find<YunNewsItem>(query, protection, sort, pageIndex, pageSize);
            return res;
        }

        /// <summary>
        /// 彻底删除实体
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteEntity(string id)
        {
            var inst = new YunNewsItem();
            inst.ID = id;
            inst.Delete();
            return 0;
        }

        public int EmptyRecycleBin()
        {
            var list = this.LoadRecycleBinEntityList("{}", "{}", "{}", 0, int.MaxValue);
            foreach (YunNewsItem item in list)
            {
                item.Delete();
            }
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


    }
}
