using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
                if (null != HttpContext.Current)
                {
                    string _SID = HttpContext.Current.Request.QueryString["_SID"];
                    if (StringChecker.IsObjectId(_SID))
                    {
                        session = SESSION.Get(_SID);
                    }
                    else if ("CreateCompany" == _SID)
                    {
                        session = new SESSION { UserID = ObjectId.Empty.ToString(), UserName = "系统服务程序", CompanyID = ObjectId.Empty.ToString(), CompanyName = "系统", LastestRequestUrl = HttpContext.Current.Request.RawUrl };
                    }
                    else if ("Login" == _SID)
                    {
                        session = new SESSION { UserID = ObjectId.Empty.ToString(), UserName = "系统服务程序", CompanyID = ObjectId.Empty.ToString(), CompanyName = "系统", LastestRequestUrl = HttpContext.Current.Request.RawUrl };
                    }
                    else {
                        throw new Exception("会话出现错误");
                    } 
                }
                else
                {
                    session = new SESSION { UserID = ObjectId.Empty.ToString(), UserName = "系统服务程序", CompanyID = ObjectId.Empty.ToString(), CompanyName = "系统", LastestRequestUrl = string.Empty };
                }

                return session;
            }
        }

        public static  SESSION Get(string _SID)
        {
            var dict = DataStorage.GetInstance(DBType.MongoDB).Get("WangJun", "SESSION", MongoDBFilterCreator.SearchByObjectId(_SID));
            return Convertor.FromDictionaryToObject<SESSION>(dict);
        }

        public static void Set(SESSION session)
        {
            DataStorage.GetInstance(DBType.MongoDB).Save3("WangJun", "SESSION", session, MongoDBFilterCreator.SearchByObjectId(session.UserID));
        }

        public static SESSION Login(string loginID, string password)
        {
            var session = new SESSION();
            var query = "{'Email':'"+loginID+"'}";
            var res = EntityManager.GetInstance().Get<BaseUser>("WangJun", "YunUser", query);
            //var res2  =EntityManager.GetInstance().Get<BaseUser>("WangJun",)
            if(null != res)
            {
                session = SESSION.Get(res.ID);
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
