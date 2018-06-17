using System.Collections.Generic;
using System.Linq;
using System.Text;
using WangJun.App;
using WangJun.Entity;
using WangJun.Utility;
using WangJun.Yun;

namespace WangJun.YunQun
{
    /// <summary>
    /// 
    /// </summary>
    public class YunQunWebAPI: YunWebAPI
    { 

        #region  IApp
        public long Version { get { return 1; } set { } }

        public string AppName { get { return "企业群组应用"; } set { } }

        public long AppCode { get { return 1803001009; } set { } }
        public IApp CurrentApp {get { return (this as IApp); }}
        #endregion

        #region 初始化应用
        public int RegisterApp(string companyID,string securityCode)
        {
            var company = YunCompany.Load(companyID);

            #region 初始化目录
            var yunCategory0 = YunCategory.CreateAsNew("企业总群"); ///根目录
            yunCategory0.CompanyID = companyID;
            yunCategory0.CompanyName = company.Name;
            yunCategory0.AppCode = this.CurrentApp.AppCode;
            yunCategory0.AppName = this.CurrentApp.AppName;
            yunCategory0.Version = this.CurrentApp.Version;
            yunCategory0.OwnerID = company.ID;
            yunCategory0.OwnerName = company.Name;
            yunCategory0.Save();



            #endregion
            #region 初始化第一个群
            var qun = YunArticle.CreateAsHtml();
            qun.CompanyID = companyID;
            qun.CompanyName = company.Name;
            qun.AppCode = this.CurrentApp.AppCode;
            qun.AppName = this.CurrentApp.AppName;
            qun.Version = this.CurrentApp.Version;
            qun.OwnerID = company.ID;
            qun.OwnerName = company.Name;
            qun.Title = "企业总群";
            qun.ParentID = yunCategory0.ID ;
            //qun.ParentName = yunCategory0.Name;
           


            qun.Save();
            #endregion

            return (int)EnumResult.成功;
        }
        #endregion

        #region 初始化个人应用
        public int PersonalAppInitial(string userID, string securityCode)
        {
            var user = YunUser.Load(userID);
            var userName = SESSION.Current.UserName;
            var company = YunCompany.Load(SESSION.Current.CompanyID);
            var companyID = company.CompanyID;
            var companyName = company.CompanyID; 

            var count = EntityManager.GetInstance().Count<YunCategory>(p => p.OwnerID == userID);
            if (0 == count)
            {
                #region 初始化目录
                var yunCategory0 = YunCategory.CreateAsNew("个人群"); ///根目录
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

            #region 权限保存
            if (null != ar.UserAllowedArray)
            {
                foreach (string userItem in ar.UserAllowedArray)
                {
                    var permission = new YunPermission
                    {
                        ObjectID = ar._GID,
                        ObjectType = (int)EnumObjectType.文档,
                        ObjectTypeName = EnumObjectType.文档.ToString(),
                        OperatorID = SUID.FromStringToGuid(userItem),
                        OperatorName = YunUser.Load(userItem).Name,
                        OperatorType = (int)EnumObjectType.用户,
                        Allow = true,
                        BehaviorType = (int)EnumBehaviorType.参与评论,
                        AppCode = this.AppCode,
                        AppName = this.AppName,
                        Version = this.Version

                    };
                    permission.Save();
                }
            }
            #endregion

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
            var res2 = EntityManager.GetInstance().Find<YunArticle>(p => p.CompanyID == SESSION.Current.CompanyID && p.AppCode == this.CurrentApp.AppCode&&p.StatusCode==(int)EnumStatus.正常,p=>p.CreateTime,pageIndex ,pageSize,true);

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

 

        #region 获取分享列表
        public List<YunArticle> LoadShareArticleList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            var list = new List<YunArticle>();
            var objectIDList = YunPermission.LoadSharePermission(SESSION.Current.UserID, this.AppCode, (int)EnumBehaviorType.参与评论).Select(p => p.ObjectID);
            query = "{{ _GID: {{ $in: [ {0} ] }} }}";
            var stringBuilder = new StringBuilder();
            foreach (var objectID in objectIDList)
            {
                stringBuilder.AppendFormat(",UUID('{0}')", objectID);
            }
            query = string.Format(query, stringBuilder.ToString().Trim(','));
            list = EntityManager.GetInstance().Find<YunArticle>(query);
            var res2 = EntityManager.GetInstance().Find<YunArticle>((p => objectIDList.Contains(p._GID)));
            return list;
        }
        #endregion



    }
}
