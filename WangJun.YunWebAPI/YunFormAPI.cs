using System;
using System.Collections.Generic;
using System.Linq; 
using WangJun.Entity;
using WangJun.Net;
using WangJun.Utility;
using WangJun.Yun;
using WangJun.YunDoc;
using WangJun.YunNews;
using WangJun.YunNote;
using WangJun.YunPan;
using WangJun.YunProject;
using WangJun.YunQun;

namespace WangJun.App
{
    /// <summary>
    /// 
    /// </summary>
    public class YunFormAPI : YunWebAPI
    {

        public YunFormAPI() : base("表单应用", 1803001011, 1)
        {

        } 

        #region 初始化应用
        public int RegisterApp(string companyID,string superAdminID,string securityCode)
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
            #region 设置管理员所属组织
            var superAdmin = YunUser.Load(superAdminID);
            superAdmin.ParentID = yunCategory0.ID;
            superAdmin.ParentName = yunCategory0.Name;
            superAdmin.RootID = yunCategory0.ID;
            superAdmin.RootName = yunCategory0.Name;
            superAdmin.Save();
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
            try
            {
                var dict = Convertor.FromJsonToDict2(jsonInput);
                var ar = Convertor.FromJsonToObject2<YunUser>(jsonInput);
                ar.AppCode = this.CurrentApp.AppCode;
                ar.AppName = this.CurrentApp.AppName;
                ar.Version = this.CurrentApp.Version;
                ar.Save();

                ///设置权限
                var canManageYunPan = bool.Parse(dict["CanManageYunPan"].ToString());
                var canManageYunQun = bool.Parse(dict["CanManageYunQun"].ToString());
                var canManageYunProject = bool.Parse(dict["CanManageYunProject"].ToString());
                var canManageYunDoc = bool.Parse(dict["CanManageYunDoc"].ToString());
                var canManageYunNews = bool.Parse(dict["CanManageYunNews"].ToString());
                var canManageYunNote = bool.Parse(dict["CanManageYunNote"].ToString());
                var canManageUser = bool.Parse(dict["CanManageStaff"].ToString());

                if (canManageYunPan)
                {
                    new YunPanWebAPI().PersonalAppInitial(ar.ID, "");
                    new YunPanWebAPI().SetManagerID(ar.ID,true);
                }

                if (canManageYunQun)
                {
                    new YunQunWebAPI().PersonalAppInitial(ar.ID, "");
                    new YunQunWebAPI().SetManagerID(ar.ID, true);
                }

                if (canManageYunProject)
                {
                    new YunProjectWebAPI().PersonalAppInitial(ar.ID, "");
                    new YunProjectWebAPI().SetManagerID(ar.ID, true);
                }

                if (canManageYunDoc)
                {
                    new YunDocWebAPI().PersonalAppInitial(ar.ID, "");
                    new YunDocWebAPI().SetManagerID(ar.ID, true);
                }


                if (canManageYunNews)
                {
                    new YunNewsWebAPI().SetManagerID(ar.ID, true);
                }

                if (canManageYunNote)
                {
                    new YunNoteWebAPI().PersonalAppInitial(ar.ID, "");
                    new YunNoteWebAPI().SetManagerID(ar.ID, true);
                }

                if (canManageUser)
                {
                    new YunFormAPI().SetManagerID(ar.ID, true);
                }
                return (int)EnumResult.成功;
            }
            catch (Exception e)
            {

            }


            return (int)EnumResult.失败;
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
            query = "{$and:[" + query + ",{'OwnerID':'" + SESSION.Current.CompanyID + "','AppCode':" + this.AppCode + "},{'StatusCode':{$eq:" +(int)EnumStatus.删除 + "}}]}";
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
         

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="jsonInput"></param>
        /// <returns></returns>
        public SESSION Login(string jsonInput)
        {
            var dict = Convertor.FromJsonToDict2(jsonInput);
            var loginID = dict["LoginID"].ToString();
            var session = new SESSION();
            var query = string.Format("{{$or:[{{'LoginEmail':'{0}'}},{{'LoginPhone':'{0}'}},{{'LoginQQ':'{0}'}},{{'LoginWeChat':'{0}'}},{{'LoginName':'{0}'}}]}}", loginID);
            var res = EntityManager.GetInstance().Get<YunUser>("WangJun", "YunUser", query);
            var res2 = EntityManager.GetInstance().Get<YunUser>(p => p.LoginEmail == loginID || p.LoginPhone == loginID || p.LoginQQ == loginID || p.LoginWeChat == loginID || p.LoginName == loginID);


            ///查找权限
            var permissionList = YunPermission.LoadAppPermission(res.ID);

            #region session设置
            session.UserID = res.ID;
            session.UserName = res.NickName;
            session.PositionName = res.PositionName;
            session.CompanyID = res.CompanyID;
            session.CompanyName = res.CompanyName;
            session.IsSuperAdmin = true;
            session.CanManageYunDoc = YunPermission.CanManageApp(session.UserID,new YunDocWebAPI().AppCode);
            session.CanManageYunNews = YunPermission.CanManageApp(session.UserID, new YunNewsWebAPI().AppCode);
            session.CanManageYunNote = YunPermission.CanManageApp(session.UserID,new YunNoteWebAPI().AppCode);
            session.CanManageYunQun = YunPermission.CanManageApp(session.UserID,new YunQunWebAPI().AppCode) ;
            session.CanManageStaff = YunPermission.CanManageApp(session.UserID,new YunFormAPI().AppCode); 
            session.CanManageYunPan = YunPermission.CanManageApp(session.UserID,new YunPanWebAPI().AppCode); 
            session.CanManageYunProject = YunPermission.CanManageApp(session.UserID,new YunProjectWebAPI().AppCode);
            session.LoginTime = DateTime.Now;
            session.LastUpdateTime = DateTime.Now;
            SESSION.Set(session);
            #endregion
            return session;
        }

        public YunUser GetUser(string loginID)
        {
            var query = string.Format("{{$or:[{{'LoginEmail':'{0}'}},{{'LoginPhone':'{0}'}},{{'LoginQQ':'{0}'}},{{'LoginWeChat':'{0}'}},{{'LoginName':'{0}'}}]}}", loginID);
            var res = EntityManager.GetInstance().Get<YunUser>("WangJun", "YunUser", query);
            var res2 = EntityManager.GetInstance().Get<YunUser>(p => p.LoginEmail == loginID || p.LoginPhone == loginID || p.LoginQQ == loginID || p.LoginWeChat == loginID || p.LoginName == loginID);
            return res;
        }

        public bool HasRegister(string loginID)
        {
            return null != this.GetUser(loginID);
        }

        public void Heartbeat(string input) {
            var _sid = SESSION.Current.UserID;
            var session = SESSION.Get(_sid);
            session.LastUpdateTime = DateTime.Now;
            SESSION.Set(session);
        }
    }
}
