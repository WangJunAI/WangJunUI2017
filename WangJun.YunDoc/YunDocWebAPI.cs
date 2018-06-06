﻿using System.Collections.Generic;
using System.Linq;
using WangJun.Config;
using WangJun.Entity;
using WangJun.Utility;
using WangJun.Yun;

namespace WangJun.YunDoc
{
    /// <summary>
    /// 
    /// </summary>
    public class YunDocWebAPI:IApp
    { 

        #region  IApp
        public long Version { get { return 1; } set { } }

        public string AppName { get { return "文档库应用"; } set { } }

        public long AppCode { get { return 1803001007; } set { } }
        public IApp CurrentApp {get { return (this as IApp); }}
        #endregion

        #region 初始化应用
        public int RegisterApp(string companyID,string securityCode)
        {
            var company = YunCompany.Load(companyID);

            #region 初始化目录
            var yunCategory0 = YunCategory.CreateAsNew("企业知识库"); ///根目录
            yunCategory0.CompanyID = companyID;
            yunCategory0.CompanyName = company.Name;
            yunCategory0.AppCode = this.CurrentApp.AppCode;
            yunCategory0.AppName = this.CurrentApp.AppName;
            yunCategory0.Version = this.CurrentApp.Version;
            yunCategory0.OwnerID = company.ID;
            yunCategory0.OwnerName = company.Name;
            yunCategory0.Save();

            var yunCategory1 = YunCategory.CreateAsNew("技术标准"); ///根目录
            yunCategory1.CompanyID = companyID;
            yunCategory1.CompanyName = company.Name;
            yunCategory1.AppCode = this.CurrentApp.AppCode;
            yunCategory1.AppName = this.CurrentApp.AppName;
            yunCategory1.Version = this.CurrentApp.Version;
            yunCategory1.RootID = yunCategory0.ID;
            yunCategory1.RootName = yunCategory0.Name;
            yunCategory1.ParentID = yunCategory0.ID;
            yunCategory1.ParentName = yunCategory0.Name;
            yunCategory1.OwnerID = company.ID;
            yunCategory1.OwnerName = company.Name;
            yunCategory1.Save();

            var yunCategory2 = YunCategory.CreateAsNew("管理手册");
            yunCategory2.CompanyID = companyID;
            yunCategory2.CompanyName = company.Name;
            yunCategory2.AppCode = this.CurrentApp.AppCode;
            yunCategory2.AppName = this.CurrentApp.AppName;
            yunCategory2.Version = this.CurrentApp.Version;
            yunCategory2.RootID = yunCategory0.ID;
            yunCategory2.RootName = yunCategory0.Name;
            yunCategory2.ParentID = yunCategory0.ID;
            yunCategory2.ParentName = yunCategory0.Name;
            yunCategory2.OwnerID = company.ID;
            yunCategory2.OwnerName = company.Name;
            yunCategory2.Save();

            var yunCategory3 = YunCategory.CreateAsNew("营销宝典"); ///根目录
            yunCategory3.CompanyID = companyID;
            yunCategory3.CompanyName = company.Name;
            yunCategory3.AppCode = this.CurrentApp.AppCode;
            yunCategory3.AppName = this.CurrentApp.AppName;
            yunCategory3.Version = this.CurrentApp.Version;
            yunCategory3.RootID = yunCategory0.ID;
            yunCategory3.RootName = yunCategory0.Name;
            yunCategory3.ParentID = yunCategory0.ID;
            yunCategory3.ParentName = yunCategory0.Name;
            yunCategory3.OwnerID = company.ID;
            yunCategory3.OwnerName = company.Name;
            yunCategory3.Save();

            var yunCategory4 = YunCategory.CreateAsNew("宣传资料"); ///自动化聚集
            yunCategory4.CompanyID = companyID;
            yunCategory4.CompanyName = company.Name;
            yunCategory4.AppCode = this.CurrentApp.AppCode;
            yunCategory4.AppName = this.CurrentApp.AppName;
            yunCategory4.Version = this.CurrentApp.Version;
            yunCategory4.RootID = yunCategory0.ID;
            yunCategory4.RootName = yunCategory0.Name;
            yunCategory4.ParentID = yunCategory0.ID;
            yunCategory4.ParentName = yunCategory0.Name;
            yunCategory4.OwnerID = company.ID;
            yunCategory4.OwnerName = company.Name;
            yunCategory4.Save();

            #endregion
            #region 初始化第一篇文章

            #endregion

            return (int)EnumResult.成功;
        }
        #endregion

        #region 初始化个人应用
        public int PersonalAppInitial(string userID, string securityCode)
        {
            var user = YunUser.Load(userID);
            var userName = SESSION.Current.UserName;
            var companyID = user.CompanyID;
            var companyName = user.CompanyName;

            var count = EntityManager.GetInstance().Count<YunCategory>(p => p.OwnerID == userID && p.AppCode == this.CurrentApp.AppCode);
            if (0 == count)
            {
                #region 初始化目录
                var yunCategory0 = YunCategory.CreateAsNew("我的知识库"); ///根目录
                yunCategory0.CompanyID = companyID;
                yunCategory0.CompanyName = companyName;
                yunCategory0.AppCode = this.CurrentApp.AppCode;
                yunCategory0.AppName = this.CurrentApp.AppName;
                yunCategory0.Version = this.CurrentApp.Version;
                yunCategory0.OwnerID = userID;
                yunCategory0.OwnerName = userName;
                yunCategory0.Save();

                var yunCategory1 = YunCategory.CreateAsNew("技术文摘"); ///根目录
                yunCategory1.CompanyID = companyID;
                yunCategory1.CompanyName = companyName;
                yunCategory1.AppCode = this.CurrentApp.AppCode;
                yunCategory1.AppName = this.CurrentApp.AppName;
                yunCategory1.Version = this.CurrentApp.Version;
                yunCategory1.RootID = yunCategory0.ID;
                yunCategory1.RootName = yunCategory0.Name;
                yunCategory1.ParentID = yunCategory0.ID;
                yunCategory1.ParentName = yunCategory0.Name;
                yunCategory1.OwnerID = userID;
                yunCategory1.OwnerName = userName;
                yunCategory1.Save();

                var yunCategory2 = YunCategory.CreateAsNew("收藏文章");
                yunCategory2.CompanyID = companyID;
                yunCategory2.CompanyName = companyName;
                yunCategory2.AppCode = this.CurrentApp.AppCode;
                yunCategory2.AppName = this.CurrentApp.AppName;
                yunCategory2.Version = this.CurrentApp.Version;
                yunCategory2.RootID = yunCategory0.ID;
                yunCategory2.RootName = yunCategory0.Name;
                yunCategory2.ParentID = yunCategory0.ID;
                yunCategory2.ParentName = yunCategory0.Name;
                yunCategory2.OwnerID = userID;
                yunCategory2.OwnerName = userName;
                yunCategory2.Save();

                var yunCategory3 = YunCategory.CreateAsNew("小说"); ///根目录
                yunCategory3.CompanyID = companyID;
                yunCategory3.CompanyName = companyName;
                yunCategory3.AppCode = this.CurrentApp.AppCode;
                yunCategory3.AppName = this.CurrentApp.AppName;
                yunCategory3.Version = this.CurrentApp.Version;
                yunCategory3.RootID = yunCategory0.ID;
                yunCategory3.RootName = yunCategory0.Name;
                yunCategory3.ParentID = yunCategory0.ID;
                yunCategory3.ParentName = yunCategory0.Name;
                yunCategory3.OwnerID = userID;
                yunCategory3.OwnerName = userName;
                yunCategory3.Save(); 

                #endregion
            }
            return (int)EnumResult.成功;
        }
        #endregion

        #region 管理账号操作
        public int SetManagerID(string userID, string canManage, string securityCode)
        {
            var user = YunUser.Load(userID);
            var per1 = new YunPermisssion { };
            per1.Allow = true;
            per1.OperatorID = user._GID;
            per1.OperatorName = user.Name;
            per1.OperatorType = (int)EnumOperatorType.用户;
            per1.AppCode = this.CurrentApp.AppCode;
            per1.AppName = this.CurrentApp.AppName;
            per1.ObjectID = SUID.FromStringToGuid("FFFFFFFFFFFFFFFFFFFFFFFF");
            per1.ObjectType = (int)EnumObjectType.应用管理;
            per1.ObjectTypeName = EnumObjectType.应用管理.ToString();
            per1.CompanyID = user.CompanyID;
            per1.CompanyName = user.CompanyName;
            per1.Save();

            return (int)EnumResult.成功;
        }
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
            var ar = Convertor.FromJsonToObject2<YunCategory>(jsonInput);
            ar.AppCode = this.CurrentApp.AppCode;
            ar.AppName = this.CurrentApp.AppName;
            ar.Version = this.CurrentApp.Version;
             
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
        public List<YunCategory> LoadCategoryList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            var dict = Convertor.FromJsonToDict2(query);
 
                query = "{$and:[" + query + ",{'CompanyID':'" + SESSION.Current.CompanyID + "','AppCode':" + this.CurrentApp.AppCode + "},{'StatusCode':{$eq:" + (int)EnumStatus.正常 + "}}]}";

            ///MongoDB
            var res = EntityManager.GetInstance().Find<YunCategory>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Find<YunCategory>(p=>p.CompanyID == SESSION.Current.CompanyID&& p.AppCode == this.AppCode,p=>p.CreateTime,0,1000,false).ToList();
            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveCategory(string id)
        {
            YunCategory.Remove(id);
            return 0;
        }

        public YunCategory GetCategory(string id)
        {
            var inst = YunCategory.Load(id);

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
            var ar = Convertor.FromJsonToObject2<YunArticle>(jsonInput);
            ar.AppCode = this.CurrentApp.AppCode;
            ar.AppName = this.CurrentApp.AppName;
            ar.Version = this.CurrentApp.Version;
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
        public List<YunArticle> LoadEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            ///MongoDB
            query = "{$and:[" + query + ",{'StatusCode':{$eq:" + (int)EnumStatus.正常 + "}},{'AppCode':" + this.CurrentApp.AppCode + "}]}";
            var res = EntityManager.GetInstance().Find<YunArticle>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Find<YunArticle>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode && p.StatusCode == (int)EnumStatus.正常, p => p.CreateTime, pageIndex, pageSize, true);


            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveEntity(string id)
        {
            YunArticle.Remove(id);

            return 0;
        }

        public YunArticle GetEntity(string id)
        {
            var inst = YunArticle.Load(id);
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

            var ar = Convertor.FromJsonToObject2<YunComment>(jsonInput);
            ar.AppCode = this.CurrentApp.AppCode;
            ar.AppName = this.CurrentApp.AppName;
            ar.Version = this.CurrentApp.Version;

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
        public List<YunComment> LoadCommentList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            var dict = Convertor.FromJsonToDict2(query);
            var rootID=dict["RootID"].ToString();
            query = "{$and:[" + query + ",{'StatusCode':{$eq:" +(int)EnumStatus.正常 + "}}]}";
            var res = EntityManager.GetInstance().Find<YunComment>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Find<YunComment>(p => p.RootID == rootID && p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode && p.StatusCode == (int)EnumStatus.正常, p => p.CreateTime, pageIndex, pageSize, true);


            return res;
        }


        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveComment(string id)
        {
            YunComment.Remove(id);

            return 0;
        }

        public YunComment GetComment(string id)
        {
            var inst = YunComment.Load(id);

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
            var item = new YunArticle();
            var match = "{$match:" + json + "}";
            var group = "{$group:{_id:'YunArticle',Count:{$sum:1}}}";
            var res = EntityManager.GetInstance().Aggregate(item._DbName, item._CollectionName, match, group);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Count<YunArticle>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode);
            return res;
        }
        #endregion

        #region 回收站
        public List<YunArticle> LoadRecycleBinEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            ///MongoDB
            query = "{$and:[" + "{}" + ",{'OwnerID':'" + SESSION.Current.CompanyID + "','AppCode':" + this.AppCode + "},{'StatusCode':{$eq:" +(int)EnumStatus.删除 + "}}]}";
            var res = EntityManager.GetInstance().Find<YunArticle>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Find<YunArticle>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode && p.StatusCode == (int)EnumStatus.删除,p => p.CreateTime,pageIndex ,pageSize,true).ToList();

            return res;
             
        }

        /// <summary>
        /// 彻底删除实体
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteEntity(string id)
        {
            YunArticle.Delete(id);

            return 0;
        }

        public int EmptyRecycleBin()
        {
            var list = this.LoadRecycleBinEntityList("{}", "{}", "{}", 0, int.MaxValue);
            foreach (YunArticle item in list)
            {
                YunArticle.Delete(item.ID);
            }
             
            return 0;
        }
        #endregion


        #region 聚合计算
        public object Aggregate(string itemType, string match, string group)
        {
            //var item = new BaseItem();
            //if ("Entity" == itemType)
            //{
            //    item = new YunNewsItem();
            //}
            //else if ("Category" == itemType)
            //{
            //    item = new CategoryItem();
            //}
            //var res = EntityManager.GetInstance().Aggregate(item._DbName, item._CollectionName, match, group);
            //return res;
            return null;
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
            YunBehavior.Save(operateTypeCode: (int)EnumBehavior.点赞, operateType: EnumBehavior.点赞.ToString()
                                         , targetTypeCode: (int)EnumBizType.文章, targetType: EnumBizType.文章.ToString()
                                         , operatorID: SUID.FromStringToGuid(SESSION.Current.UserID), operatorName: SESSION.Current.UserName
                                         , targetID: SUID.FromStringToGuid(id), targetName: "暂空"
                                         , appCode: this.CurrentApp.AppCode, appName: this.CurrentApp.AppName
                                         , companyID: SESSION.Current.CompanyID, companyName: SESSION.Current.CompanyName);


            return 0;
        }

        /// <summary>
        /// 添加收藏行为
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public object AddFavoriteCount(string id)
        {
            YunBehavior.Save(operateTypeCode: (int)EnumBehavior.收藏, operateType: EnumBehavior.收藏.ToString()
                                         , targetTypeCode: (int)EnumBizType.文章, targetType: EnumBizType.文章.ToString()
                                         , operatorID: SUID.FromStringToGuid(SESSION.Current.UserID), operatorName: SESSION.Current.UserName
                                         , targetID: SUID.FromStringToGuid(id), targetName: "暂空"
                                         , appCode: this.CurrentApp.AppCode, appName: this.CurrentApp.AppName
                                         , companyID: SESSION.Current.CompanyID, companyName: SESSION.Current.CompanyName);
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
             YunBehavior.Save(operateTypeCode: (int)EnumBehavior.阅读, operateType: EnumBehavior.阅读.ToString()
                             , targetTypeCode: (int)EnumBizType.文章, targetType: EnumBizType.文章.ToString()
                             , operatorID: SUID.FromStringToGuid(SESSION.Current.UserID), operatorName: SESSION.Current.UserName
                             , targetID: SUID.FromStringToGuid(id), targetName: "暂空"
                             , appCode: this.CurrentApp.AppCode, appName: this.CurrentApp.AppName
                             , companyID: SESSION.Current.CompanyID, companyName: SESSION.Current.CompanyName);
            return 0;
        }
        #endregion

        #region ClientRead
        public object GetBehaviorByArticleID(string id)
        {
            //return ClientBehaviorItem.LoadByDBID(id);
            return null;
        }
        #endregion

    }
}