using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Web;
using WangJun.DB;
using WangJun.Utility;

namespace WangJun.Entity
{
    /// <summary>
    /// 全局会话服务
    /// </summary>
    public class SESSION 
    {
        private static Dictionary<string, SESSION> sessionDict = new Dictionary<string, SESSION>();
        
        public string ID { get; set; }

        public string LoginID { get; set; }

        public string UserID { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string CompanyID { get; set; }

        public string CompanyName { get; set; }

        public bool IsSuperAdmin { get; set; }

        public bool CanManageYunPan { get; set; }

        public bool CanManageYunQun { get; set; }

        public bool CanManageYunProject { get; set; }

        public bool CanManageYunDoc { get; set; }
        public bool CanManageYunNews { get; set; }

        public bool CanManageYunNote { get; set; }
        public bool CanManageStaff { get; set; } 

        public DateTime LoginTime { get; set; }

        public DateTime LastUpdateTime { get; set; }

        public string LastestRequestUrl { get; set; }
 
 
        public object ExData { get; set; }

        public static SESSION Current
        {

            get
            {
                var session = new SESSION();
                string _SID = HttpContext.Current.Request.QueryString["_SID"];
                if (null != HttpContext.Current&& StringChecker.IsObjectId(_SID))
                {
                    session = SESSION.Get(_SID); 
 
                }
                else
                {
                    session = new SESSION { UserID = ObjectId.Empty.ToString(), UserName = "服务程序", CompanyID = ObjectId.Empty.ToString(), CompanyName = "系统", LastestRequestUrl = string.Empty };
                }

                return session;
            }
        }

        public static  SESSION Get(string _SID)
        {
            if (StringChecker.IsObjectId(_SID))
            {
                var session = new SESSION();
                if (!string.IsNullOrWhiteSpace(_SID) && (!SESSION.sessionDict.ContainsKey(_SID) || null == SESSION.sessionDict[_SID]))
                {
                    var staff = new BaseItem();
                    staff.ID = _SID;
                    staff._DbName = "WangJun";
                    staff._CollectionName = "Staff";
                    var res = DataStorage.GetInstance(DBType.MongoDB).Get(staff._DbName, staff._CollectionName, MongoDBFilterCreator.SearchByObjectId(_SID));
                    staff = Convertor.FromDictionaryToObject<BaseItem>(res);
                    session = new SESSION
                    {
                        UserID = staff.ID,
                        UserName = staff.Name,
                        CompanyID = staff.CompanyID,
                        CompanyName = staff.CompanyName,
                        LastestRequestUrl = HttpContext.Current.Request.RawUrl
                        ,
                        CanManageYunPan = bool.Parse(res["CanManageYunPan"].ToString()),
                        CanManageYunQun = bool.Parse(res["CanManageYunQun"].ToString()),
                        CanManageYunProject = bool.Parse(res["CanManageYunProject"].ToString()),
                        CanManageYunDoc = bool.Parse(res["CanManageYunDoc"].ToString()),
                        CanManageYunNews = bool.Parse(res["CanManageYunNews"].ToString()),
                        CanManageYunNote = bool.Parse(res["CanManageYunNote"].ToString()),
                        CanManageStaff = bool.Parse(res["CanManageStaff"].ToString()),
                    };

                }
                else if (SESSION.sessionDict.ContainsKey(_SID) && null == SESSION.sessionDict[_SID])
                {
                    session = SESSION.sessionDict[_SID];
                }
                return session;
            }
            return null;
        }

        public static SESSION Login(string loginID, string password)
        {
            var session = new SESSION();
            var query = "{'Email':'"+loginID+"'}";
            var res = EntityManager.GetInstance().Find<BaseItem>("WangJun","Staff",query,"{}","{}");
            if(1 == res.Count)
            {
                session = SESSION.Get(res[0].ID);
            }
            return session;

        }

        /// <summary>
        /// [OK]
        /// </summary>
        public void Save()
        {
        }
        public static void Save(string jsonInput)
        {

        }
        public void Remove()
        {

        }
    }
}
