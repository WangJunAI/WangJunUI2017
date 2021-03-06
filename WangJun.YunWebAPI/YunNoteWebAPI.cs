﻿using System.Collections.Generic;
using System.Linq;
using System.Text;
using WangJun.App;
using WangJun.Entity;
using WangJun.Utility;
using WangJun.Yun;

namespace WangJun.YunNote
{
    /// <summary>
    /// 
    /// </summary>
    public class YunNoteWebAPI : YunWebAPI
    {
        public YunNoteWebAPI() : base("云笔记应用", 1803001002, 1)
        {

        } 

        #region 初始化应用
        public int RegisterApp(string companyID,string securityCode)
        {
            var company = YunCompany.Load(companyID);
 
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

            var count = EntityManager.GetInstance().Count<YunCategory>(p => p.OwnerID == userID&&p.AppCode == this.CurrentApp.AppCode);
            if (0 == count)
            {
                #region 初始化目录
                var yunCategory0 = YunCategory.CreateAsNew("我的云笔记"); ///根目录
                yunCategory0.CompanyID = companyID;
                yunCategory0.CompanyName = companyName;
                yunCategory0.AppCode = this.CurrentApp.AppCode;
                yunCategory0.AppName = this.CurrentApp.AppName;
                yunCategory0.Version = this.CurrentApp.Version;
                yunCategory0.OwnerID = userID;
                yunCategory0.OwnerName = userName;
                yunCategory0.Save();

                var yunCategory1 = YunCategory.CreateAsNew("技巧"); ///根目录
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

                var yunCategory2 = YunCategory.CreateAsNew("文摘");
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

                var yunCategory3 = YunCategory.CreateAsNew("账号"); ///根目录
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

                var yunCategory4 = YunCategory.CreateAsNew("窍门"); ///自动化聚集
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
            ar.OwnerID = SESSION.Current.UserID;
            ar.OwnerName = SESSION.Current.UserName;

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
                        BehaviorType = (int)EnumBehaviorType.分享阅读,
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

         
 

           

        #region 获取分享列表
        public List<YunArticle> LoadShareArticleList(string query, string protection = "{}", string sort = "{}", int pageIndex = 0, int pageSize = 50)
        {
            var list = new List<YunArticle>();
            var objectIDList = YunPermission.LoadSharePermission(SESSION.Current.UserID, this.AppCode, (int)EnumBehaviorType.分享阅读).OrderByDescending(p=>p.CreateTime).Skip(pageIndex*pageSize).Take(pageSize).Select(p => p.ObjectID);
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
