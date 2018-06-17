using System.Collections.Generic;
using System.Linq; 
using WangJun.Entity;
using WangJun.Net;
using WangJun.Utility;
using WangJun.Yun;

namespace WangJun.App
{
    /// <summary>
    /// 
    /// </summary>
    public class YunUserAPI : YunWebAPI
    { 

        #region  IApp
        public long Version { get { return 1; } set { } }

        public string AppName { get { return "用户及组织应用"; } set { } }

        public long AppCode { get { return 1803001001; } set { } }
        public IApp CurrentApp {get { return (this as IApp); }}
        #endregion

        #region 初始化应用
        public int RegisterApp(string companyID,string securityCode)
        {
            var company = YunCompany.Load(companyID);

            #region 初始化目录
            var yunCategory0 = YunCategory.CreateAsNew(company.Name); ///根目录
            yunCategory0.CompanyID = companyID;
            yunCategory0.CompanyName = company.Name;
            yunCategory0.AppCode = this.CurrentApp.AppCode;
            yunCategory0.AppName = this.CurrentApp.AppName;
            yunCategory0.Version = this.CurrentApp.Version;
            yunCategory0.OwnerID = company.ID;
            yunCategory0.OwnerName = company.Name;
            yunCategory0.Save();

            var yunCategory1 = YunCategory.CreateAsNew("人事部"); ///根目录
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
 

            #endregion
            #region 初始化第一篇文章

            #endregion

            return (int)EnumResult.成功;
        }
        #endregion

        #region 初始化个人应用
        public int PersonalAppInitial()
        {
            var company = YunCompany.Load(SESSION.Current.CompanyID);
            var companyID = company.CompanyID;
            var companyName = company.CompanyID;
            var userID = SESSION.Current.UserID;
            var userName = SESSION.Current.UserName;

            var count = EntityManager.GetInstance().Count<YunCategory>(p => p.OwnerID == userID);
            if (0 == count)
            {
                #region 初始化目录
                var yunCategory0 = YunCategory.CreateAsNew("个人知识库"); ///根目录
                yunCategory0.CompanyID = companyID;
                yunCategory0.CompanyName = companyName;
                yunCategory0.AppCode = this.CurrentApp.AppCode;
                yunCategory0.AppName = this.CurrentApp.AppName;
                yunCategory0.Version = this.CurrentApp.Version;
                yunCategory0.OwnerID = userID;
                yunCategory0.OwnerName = userName;
                yunCategory0.Save();

                var yunCategory1 = YunCategory.CreateAsNew("知识积累"); ///根目录
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

                var yunCategory2 = YunCategory.CreateAsNew("经验");
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

                var yunCategory3 = YunCategory.CreateAsNew("美食"); ///根目录
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

                var yunCategory4 = YunCategory.CreateAsNew("技术"); ///自动化聚集
                yunCategory4.CompanyID = companyID;
                yunCategory4.CompanyName = companyName;
                yunCategory4.AppCode = this.CurrentApp.AppCode;
                yunCategory4.AppName = this.CurrentApp.AppName;
                yunCategory4.Version = this.CurrentApp.Version;
                yunCategory4.RootID = yunCategory0.ID;
                yunCategory4.RootName = yunCategory0.Name;
                yunCategory4.ParentID = yunCategory0.ID;
                yunCategory4.ParentName = yunCategory0.Name;
                yunCategory4.OwnerID = userID;
                yunCategory4.OwnerName = userName;
                yunCategory4.Save();

                #endregion
            }
            return (int)EnumResult.成功;
        }
        #endregion

        #region 管理账号操作
        public int SetManagerID(string userID, string canManage, string securityCode)
        {
            var user = YunUser.Load(userID);
            var per1 = new YunPermission { };
            per1.Allow = true;
            per1.OperatorID = user._GID;
            per1.OperatorName = user.Name;
            per1.OperatorType = (int)EnumOperatorType.用户;
            per1.AppCode = this.CurrentApp.AppCode;
            per1.AppName = this.CurrentApp.AppName;
            per1.ObjectID = SUID.FromStringToGuid("FFFFFFFFFFFFFF" + this.AppCode);
            per1.ObjectType = (int)EnumObjectType.应用管理;
            per1.ObjectTypeName = EnumObjectType.应用管理.ToString();
            per1.CompanyID = user.CompanyID;
            per1.CompanyName = user.CompanyName;
            per1.Save();

            return (int)EnumResult.成功;
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
            var ar = Convertor.FromJsonToObject2<YunUser>(jsonInput);
            ar.AppCode = this.CurrentApp.AppCode;
            ar.AppName = this.CurrentApp.AppName;
            ar.Version = this.CurrentApp.Version;
            ar.Save();

            ///设置权限
            
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=SetManagerID&p0=" + ar.ID + "&p1=true&p2=00");
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=SetManagerID&p0=" + ar.ID + "&p1=true&p2=00");
            //HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=SetManagerID&p0=" + ar.ID + "&p1=true&p2=00");

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
        public List<YunUser> LoadEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            ///MongoDB
            query = "{$and:[" + query + ",{'StatusCode':{$eq:" + (int)EnumStatus.正常 + "}}]}";
            var res = EntityManager.GetInstance().Find<YunUser>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Find<YunUser>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode&&p.StatusCode==(int)EnumStatus.正常,p=>p.CreateTime,pageIndex ,pageSize,true);

            return res;
        }


        public List<object> LoadAll()
        {
            var list1 = this.LoadCategoryList("{}");
            var list2 = this.LoadEntityList("{}");
            var list = new List<object>();
              list.AddRange(list1);
            list.AddRange(list2);
            return list;
        }

        /// <summary>
        /// 删除一个目录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveEntity(string id)
        {
            YunUser.Remove(id);

            return 0;
        }

        public YunUser GetEntity(string id)
        {
            var inst = YunUser.Load(id);
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
            var item = new YunUser();
            var match = "{$match:" + json + "}";
            var group = "{$group:{_id:'YunUser',Count:{$sum:1}}}";
            var res = EntityManager.GetInstance().Aggregate(item._DbName, item._CollectionName, match, group);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Count<YunUser>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode);
            return res;
        }
        #endregion

        #region 回收站
        public List<YunUser> LoadRecycleBinEntityList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            ///MongoDB
            query = "{$and:[" + "{}" + ",{'OwnerID':'" + SESSION.Current.CompanyID + "','AppCode':" + this.AppCode + "},{'StatusCode':{$eq:" +(int)EnumStatus.删除 + "}}]}";
            var res = EntityManager.GetInstance().Find<YunUser>(query, protection, sort, pageIndex, pageSize);

            /// SQLServer
            var res2 = EntityManager.GetInstance().Find<YunUser>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.AppCode && p.StatusCode == (int)EnumStatus.删除,p => p.CreateTime,pageIndex ,pageSize,true).ToList();

            return res;
             
        }

        /// <summary>
        /// 彻底删除实体
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteEntity(string id)
        {
            YunUser.Delete(id);

            return 0;
        }

        public int EmptyRecycleBin()
        {
            var list = this.LoadRecycleBinEntityList("{}", "{}", "{}", 0, int.MaxValue);
            foreach (YunUser item in list)
            {
                YunUser.Delete(item.ID);
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
            YunBehavior.Save(operateTypeCode: (int)EnumBehaviorType.点赞, operateType: EnumBehaviorType.点赞.ToString()
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
            YunBehavior.Save(operateTypeCode: (int)EnumBehaviorType.收藏, operateType: EnumBehaviorType.收藏.ToString()
                                         , targetTypeCode: (int)EnumBizType.文章, targetType: EnumBizType.文章.ToString()
                                         , operatorID: SUID.FromStringToGuid(SESSION.Current.UserID), operatorName: SESSION.Current.UserName
                                         , targetID: SUID.FromStringToGuid(id), targetName: "暂空"
                                         , appCode: this.CurrentApp.AppCode, appName: this.CurrentApp.AppName
                                         , companyID: SESSION.Current.CompanyID, companyName: SESSION.Current.CompanyName);
            return 0;
        }
         
        #endregion

        #region ClientRead
        public int ClientRead(string id)
        {
             YunBehavior.Save(operateTypeCode: (int)EnumBehaviorType.阅读, operateType: EnumBehaviorType.阅读.ToString()
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

        #region 服务状态检测
        public string APICheck(string input) {
            return Convertor.FromObjectToJson(this.CurrentApp);
        }
        #endregion

    }
}
