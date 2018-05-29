﻿using MongoDB.Bson;
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
                    session = new SESSION { UserID = ObjectId.Empty.ToString(), UserName = "系统服务程序", CompanyID = ObjectId.Empty.ToString(), CompanyName = "系统", LastestRequestUrl = string.Empty };
                }

                return session;
            }
        }

        public static  SESSION Get(string _SID)
        {
            var session = SESSION.sessionDict[_SID];
            return session;
            
        }

        public static void Set(SESSION session)
        {
            if (!sessionDict.ContainsKey(session.UserID))
            {
                sessionDict.Add(session.UserID, session);
            }
            else
            {
                sessionDict[session.UserID]= session;
            }
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
