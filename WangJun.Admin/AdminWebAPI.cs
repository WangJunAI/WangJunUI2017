﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Admin;
using WangJun.Config;
using WangJun.Entity;
using WangJun.HumanResource;
using WangJun.Net;
using WangJun.Utility;


namespace WangJun.Admin
{
    public class AdminWebAPI
    { 
        #region 公司创建
        public object CreateCompany(string jsonString)
        {
            var dict = Convertor.FromJsonToDict2(jsonString);
            var company = Convertor.FromDictionaryToObject<CompanyItem>(dict);

            #region 创建公司
            //var company = new CompanyItem();
            //company.Name = "汪俊科技01";
            //company.SuperAdminEmail = "";
            company.Save();

            #endregion

            #region 初始化组织信息
            ///创建组织根目录信息
            var org = new OrgItem();
            org.Name = company.Name;
            org.RootName = company.Name;
            org.RootID = company.ID;
            org.Save();
            org.CompanyID = company.ID;
            org.CompanyName = company.Name;
            org.OwnerID = company.ID;
            org.Save();

            #endregion

            #region 创建超级管理员
            var admin = new StaffItem();
            admin.Name = company.Name + "超级管理员";
            admin.ParentID = org.ID;
            admin.ParentName = org.RootName;
            admin.Email = company.SuperAdminEmail;
            admin.Level = 16;
            admin.IsAdmin = true;
            admin.Save();
            admin.CompanyID = company.ID;
            admin.CompanyName = company.Name;
            admin.OwnerID = company.ID;
            admin.Save();
            #endregion

            #region 初始化云盘///创建几个目录
            var categoryYunPan = new WangJun.YunPan.CategoryItem();
            categoryYunPan.Name = "企业云盘";
            categoryYunPan.Save();
            categoryYunPan.CompanyID = company.ID;
            categoryYunPan.CompanyName = company.Name;
            categoryYunPan.OwnerID = categoryYunPan.CompanyID;
            categoryYunPan.Save();
            #endregion

            #region 初始化云笔记
            var categoryYunNote = new WangJun.YunNote.CategoryItem();
            categoryYunNote.Name = "企业云笔记";
            categoryYunNote.Save();
            categoryYunNote.CompanyID = company.ID;
            categoryYunNote.CompanyName = company.Name;
            categoryYunNote.OwnerID = categoryYunNote.CompanyID;
            categoryYunNote.Save();
            #endregion

            #region 初始化云项目
            var categoryYunProject = new WangJun.YunProject.CategoryItem();
            categoryYunProject.Name = "企业云项目";
            categoryYunProject.Save();
            categoryYunProject.CompanyID = company.ID;
            categoryYunProject.CompanyName = company.Name;
            categoryYunProject.OwnerID = categoryYunProject.CompanyID;
            categoryYunProject.Save();
            #endregion

            #region 初始化云文档库///应该初始化几个基本文档
            var categoryYunDoc = new WangJun.YunDoc.CategoryItem();
            categoryYunDoc.Name = "企业云文档";
            categoryYunDoc.Save();
            categoryYunDoc.CompanyID = company.ID;
            categoryYunDoc.CompanyName = company.Name;
            categoryYunDoc.OwnerID = categoryYunDoc.CompanyID;
            categoryYunDoc.Save();
            #endregion

            #region 初始化云新闻库
            var categoryYunNews = new WangJun.YunNews.CategoryItem();
            categoryYunNews.Name = "企业云新闻";
            categoryYunNews.Save();
            categoryYunNews.CompanyID = company.ID;
            categoryYunNews.CompanyName = company.Name;
            categoryYunNews.OwnerID = categoryYunNews.CompanyID;
            categoryYunNews.Save();
            #endregion

            #region 用超级管理员账号登录
            var session = SESSION.Login(admin.Email, null);
            #endregion

            #region 发送邮件
            SMTP smtp = SMTP.GetInstance("smtp-mail.outlook.com", 587,"wangjun19850215@live.cn","111qqq!!!W");
            smtp.SendMail("wangjun19850215@live.cn", admin.Email, "恭喜你注册成功！","汪俊云平台");
            #endregion

            return session;
        }
        #endregion

        #region 激活人员
        public int ActiveStaff(string staffID)
        {
            #region 查找人员
            var staff = new WangJun.HumanResource.StaffWebAPI().GetEntity(staffID);
            #endregion

            #region 初始化云盘
            var categoryYunPan = new WangJun.YunPan.CategoryItem();
            categoryYunPan.Name = "我的云盘";
            categoryYunPan.OwnerID = staff.ID;
            categoryYunPan.CompanyID = staff.CompanyID;
            categoryYunPan.CompanyName = staff.CompanyName;
            categoryYunPan.OwnerID = staff.ID;
            categoryYunPan.Save();
            #endregion

            #region 初始化云笔记
            var categoryYunNote = new WangJun.YunNote.CategoryItem();
            categoryYunNote.Name = "我的云笔记";
            categoryYunNote.OwnerID = staff.ID;
            categoryYunNote.CompanyID = staff.CompanyID;
            categoryYunNote.CompanyName = staff.CompanyName;
            categoryYunNote.OwnerID = staff.ID;
            categoryYunNote.Save();
            #endregion

            #region 初始化云项目
            var categoryYunProject = new WangJun.YunProject.CategoryItem();
            categoryYunProject.Name = "我的云项目";
            categoryYunProject.OwnerID = staff.ID;
            categoryYunProject.CompanyID = staff.CompanyID;
            categoryYunProject.CompanyName = staff.CompanyName;
            categoryYunProject.OwnerID = staff.ID;
            categoryYunProject.Save();
            #endregion

            #region 初始化云文档库
            var categoryYunDoc = new WangJun.YunDoc.CategoryItem();
            categoryYunDoc.Name = "我的云文档库";
            categoryYunDoc.OwnerID = staff.ID;
            categoryYunDoc.CompanyID = staff.CompanyID;
            categoryYunDoc.CompanyName = staff.CompanyName;
            categoryYunDoc.OwnerID = staff.ID;
            categoryYunDoc.Save();
            #endregion
            return 0;
        }
        #endregion

    }
    
}
