using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Admin;
using WangJun.Config;
using WangJun.Entity;
using WangJun.HumanResource;
using WangJun.Utility;


namespace WangJun.Admin
{
    public class AdminWebAPI
    { 
        #region 公司创建
        public int CreateCompany()
        {
            #region 创建公司
            var company = new CompanyItem();
            company.Name = "汪俊科技01";
            company.Save();

            #endregion

            #region 初始化组织信息
            ///创建组织根目录信息
            var org = new OrgItem();
            org.Name = company.Name;
            org.RootName = company.Name;
            org.RootID = company.ID;
            org.CompanyID = company.ID;
            org.CompanyName = company.Name;
            org.OwnerID = company.ID;
            org.Save();

            #endregion

            #region 创建管理员
            var admin = new StaffItem();
            admin.Name = company.Name + "管理员";
            admin.ParentID = org.ID;
            admin.ParentName = org.RootName;
            admin.CompanyID = company.ID;
            admin.CompanyName = company.Name;
            admin.Email = "wj01admin";
            admin.IsSuperAdmin = true;
            admin.Level = 16;
            admin.IsAdmin = true;
            org.OwnerID = company.ID;
            admin.Save();
            #endregion

            #region 初始化云盘
            var categoryYunPan = new WangJun.YunPan.CategoryItem();
            categoryYunPan.Name = "企业云盘";
            categoryYunPan.OwnerID = admin.ID;
            categoryYunPan.CompanyID = company.ID;
            categoryYunPan.CompanyName = company.Name;
            categoryYunPan.Save();
            categoryYunPan.OwnerID = categoryYunPan.CompanyID;
            categoryYunPan.Save();
            #endregion

            #region 初始化云笔记
            var categoryYunNote = new WangJun.YunNote.CategoryItem();
            categoryYunNote.Name = "企业云笔记";
            categoryYunNote.OwnerID = admin.ID;
            categoryYunNote.CompanyID = company.ID;
            categoryYunNote.CompanyName = company.Name;
            categoryYunNote.Save();
            categoryYunNote.OwnerID = categoryYunNote.CompanyID;
            categoryYunNote.Save();
            #endregion

            #region 初始化云项目
            var categoryYunProject = new WangJun.YunProject.CategoryItem();
            categoryYunProject.Name = "企业云项目";
            categoryYunProject.OwnerID = admin.ID;
            categoryYunProject.CompanyID = company.ID;
            categoryYunProject.CompanyName = company.Name;
            categoryYunProject.Save();

            categoryYunProject.OwnerID = categoryYunProject.CompanyID;
            categoryYunProject.Save();
            #endregion

            #region 初始化云文档库
            var categoryYunDoc = new WangJun.YunDoc.CategoryItem();
            categoryYunDoc.Name = "企业云文档";
            categoryYunDoc.OwnerID = admin.ID;
            categoryYunDoc.CompanyID = company.ID;
            categoryYunDoc.CompanyName = company.Name;
            categoryYunDoc.Save();

            categoryYunDoc.OwnerID = categoryYunDoc.CompanyID;
            categoryYunDoc.Save();
            #endregion

            #region 初始化云新闻库
            var categoryYunNews = new WangJun.YunNews.CategoryItem();
            categoryYunNews.Name = "企业云新闻";
            categoryYunNews.OwnerID = admin.ID;
            categoryYunNews.CompanyID = company.ID;
            categoryYunNews.CompanyName = company.Name;
            categoryYunNews.Save();

            categoryYunNews.OwnerID = categoryYunNews.CompanyID;
            categoryYunNews.Save();
            #endregion

            return 0;
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
