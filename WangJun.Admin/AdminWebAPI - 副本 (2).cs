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
