﻿using System;
using WangJun.Entity; 
using WangJun.Net;
using WangJun.Utility;
using WangJun.Yun;

namespace WangJun.Admin
{
    public class AdminWebAPI
    { 
        #region 公司创建
        public object CreateCompany(string jsonString)
        {
            var company = YunCompany.CreateAsNew(jsonString);
            var superUser = YunUser.CreateAsSuperAdmin(company.SuperAdminEmail,company);
            var rootOrg = YunCategory.CreateAsNew(company.Name);

            #region 创建公司
            company.SuperAdminID = superUser._GID;
            company.Save();
            #endregion

            #region 创建超级管理员
            superUser.CompanyID = company.ID;
            superUser.CompanyName = company.Name;
            superUser.Save();
            #endregion

            #region 激活用户权限
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.Admin.AdminWebAPI&m=ActiveUser&p0=" + superUser.ID + "&p1=01");

            #endregion


            var sessionStr = HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.Yun.YunUser&m=Login&p0=" + Convertor.FromObjectToJson(new { LoginID = superUser.LoginEmail }));

            return Convertor.FromJsonToObject2<SESSION>(sessionStr);
        }
        #endregion

        #region 激活人员
        public int ActiveUser(string userID, string securityCode)
        {
            var user = YunUser.Load(userID);
            var companyID = user.CompanyID;

             #region 初始化用户管理App和管理权限
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.App.YunUserAPI&m=RegisterApp&p0=" + companyID + "&p1=01");
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.App.YunUserAPI&m=SetManagerID&p0=" + userID + "&p1=true&p2=00");

            #endregion

            #region 初始化新闻发布App和管理权限
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=RegisterApp&p0=" + companyID + "&p1=01");
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=SetManagerID&p0=" + userID + "&p1=true&p2=00");
            #endregion

            #region 初始化文档服务App和管理权限 
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=RegisterApp&p0=" + companyID + "&p1=01");
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunNote.YunDocWebAPI&m=PersonalAppInitial&p0=" + userID + "&p1=01");
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=SetManagerID&p0=" + userID + "&p1=true&p2=00");
            #endregion

            #region 初始化笔记服务App和管理权限 
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunNote.YunNoteWebAPI&m=PersonalAppInitial&p0=" + userID + "&p1=01");
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunNote.YunNoteWebAPI&m=SetManagerID&p0=" + userID + "&p1=true&p2=00");
            #endregion

            #region 初始化群组服务App和管理权限 
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=RegisterApp&p0=" + companyID + "&p1=01");
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=SetManagerID&p0=" + userID + "&p1=true&p2=00");
            #endregion

            #region 初始化云项目服务App和管理权限 
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=RegisterApp&p0=" + companyID + "&p1=01");
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=SetManagerID&p0=" + userID + "&p1=true&p2=00");
            #endregion
            return 0;
        }
        #endregion

    }
    
}
