using System;
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

            ///通用子目录
            var categoryYunPan1 = new WangJun.YunPan.CategoryItem();
            categoryYunPan1.Name = "培训资料";
            categoryYunPan1.Save();
            categoryYunPan1.CompanyID = company.ID;
            categoryYunPan1.CompanyName = company.Name;
            categoryYunPan1.OwnerID = categoryYunPan.CompanyID;
            categoryYunPan1.ParentID = categoryYunPan.ID;
            categoryYunPan1.ParentName = categoryYunPan.Name;
            categoryYunPan1.Save();

            var categoryYunPan2 = new WangJun.YunPan.CategoryItem();
            categoryYunPan2.Name = "管理规程";
            categoryYunPan2.Save();
            categoryYunPan2.CompanyID = company.ID;
            categoryYunPan2.CompanyName = company.Name;
            categoryYunPan2.OwnerID = categoryYunPan.CompanyID;
            categoryYunPan2.ParentID = categoryYunPan.ID;
            categoryYunPan2.ParentName = categoryYunPan.Name;
            categoryYunPan2.Save();

            var categoryYunPan3 = new WangJun.YunPan.CategoryItem();
            categoryYunPan3.Name = "人事制度";
            categoryYunPan3.Save();
            categoryYunPan3.CompanyID = company.ID;
            categoryYunPan3.CompanyName = company.Name;
            categoryYunPan3.OwnerID = categoryYunPan.CompanyID;
            categoryYunPan3.ParentID = categoryYunPan.ID;
            categoryYunPan3.ParentName = categoryYunPan.Name;
            categoryYunPan3.Save();

            var categoryYunPan4 = new WangJun.YunPan.CategoryItem();
            categoryYunPan4.Name = "宣传视频";
            categoryYunPan4.Save();
            categoryYunPan4.CompanyID = company.ID;
            categoryYunPan4.CompanyName = company.Name;
            categoryYunPan4.OwnerID = categoryYunPan.CompanyID;
            categoryYunPan4.ParentID = categoryYunPan.ID;
            categoryYunPan4.ParentName = categoryYunPan.Name;
            categoryYunPan4.Save();
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
            categoryYunDoc.Name = "企业知识库";
            categoryYunDoc.Save();
            categoryYunDoc.CompanyID = company.ID;
            categoryYunDoc.CompanyName = company.Name;
            categoryYunDoc.OwnerID = categoryYunDoc.CompanyID;
            categoryYunDoc.Save();


            var categoryYunDoc1 = new WangJun.YunDoc.CategoryItem();
            categoryYunDoc1.Name = "营销宝典";
            categoryYunDoc1.Save();
            categoryYunDoc1.CompanyID = company.ID;
            categoryYunDoc1.CompanyName = company.Name;
            categoryYunDoc1.OwnerID = categoryYunDoc.CompanyID;
            categoryYunDoc1.ParentID = categoryYunDoc.ID;
            categoryYunDoc1.ParentName = categoryYunDoc.Name;
            categoryYunDoc1.Save();

            var categoryYunDoc2 = new WangJun.YunDoc.CategoryItem();
            categoryYunDoc2.Name = "企业管理";
            categoryYunDoc2.Save();
            categoryYunDoc2.CompanyID = company.ID;
            categoryYunDoc2.CompanyName = company.Name;
            categoryYunDoc2.OwnerID = categoryYunDoc.CompanyID;
            categoryYunDoc2.ParentID = categoryYunDoc.ID;
            categoryYunDoc2.ParentName = categoryYunDoc.Name;
            categoryYunDoc2.Save();
            #endregion

            #region 初始化云新闻库
            var categoryYunNews = new WangJun.YunNews.CategoryItem();
            categoryYunNews.Name = "企业新闻";
            categoryYunNews.Save();
            categoryYunNews.CompanyID = company.ID;
            categoryYunNews.CompanyName = company.Name;
            categoryYunNews.OwnerID = categoryYunNews.CompanyID;
            categoryYunNews.Save();

            var categoryYunNews1 = new WangJun.YunNews.CategoryItem();
            categoryYunNews1.Name = "动态";
            categoryYunNews1.Save();
            categoryYunNews1.CompanyID = company.ID;
            categoryYunNews1.CompanyName = company.Name;
            categoryYunNews1.OwnerID = categoryYunNews.CompanyID;
            categoryYunNews1.ParentID = categoryYunNews.ID;
            categoryYunNews1.ParentName = categoryYunNews.Name;
            categoryYunNews1.Save();


            var categoryYunNews2 = new WangJun.YunNews.CategoryItem();
            categoryYunNews2.Name = "通知";
            categoryYunNews2.Save();
            categoryYunNews2.CompanyID = company.ID;
            categoryYunNews2.CompanyName = company.Name;
            categoryYunNews2.OwnerID = categoryYunNews.CompanyID;
            categoryYunNews2.ParentID = categoryYunNews.ID;
            categoryYunNews2.ParentName = categoryYunNews.Name;
            categoryYunNews2.Save();

            var categoryYunNews3 = new WangJun.YunNews.CategoryItem();
            categoryYunNews3.Name = "公告";
            categoryYunNews3.Save();
            categoryYunNews3.CompanyID = company.ID;
            categoryYunNews3.CompanyName = company.Name;
            categoryYunNews3.OwnerID = categoryYunNews.CompanyID;
            categoryYunNews3.ParentID = categoryYunNews.ID;
            categoryYunNews3.ParentName = categoryYunNews.Name;
            categoryYunNews3.Save();

            var categoryYunNews4 = new WangJun.YunNews.CategoryItem();
            categoryYunNews4.Name = "关于";
            categoryYunNews4.Save();
            categoryYunNews4.CompanyID = company.ID;
            categoryYunNews4.CompanyName = company.Name;
            categoryYunNews4.OwnerID = categoryYunNews.CompanyID;
            categoryYunNews4.ParentID = categoryYunNews.ID;
            categoryYunNews4.ParentName = categoryYunNews.Name;
            categoryYunNews4.Save();
            #endregion

            #region 初始化云群
            var categoryYunQun = new WangJun.YunQun.CategoryItem();
            categoryYunQun.Name = "企业群";
            categoryYunQun.Save();
            categoryYunQun.CompanyID = company.ID;
            categoryYunQun.CompanyName = company.Name;
            categoryYunQun.OwnerID = categoryYunQun.CompanyID;
            categoryYunQun.Save();
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
