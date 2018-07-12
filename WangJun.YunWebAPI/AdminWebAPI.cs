using System;
using WangJun.App;
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
            company.Status = EnumStatus.处理中.ToString();
            company.StatusCode = (int)EnumStatus.处理中;
            company.Save();
            #endregion

            #region 创建超级管理员
            superUser.CompanyID = company.ID;
            superUser.CompanyName = company.Name;
            superUser.PositionName = "超级管理员";
            superUser.Save();
            #endregion

            #region 激活用户权限
            this.ActiveUser(superUser.ID, "");
            #endregion

            company.Status = EnumStatus.正常.ToString();
            company.StatusCode = (int)EnumStatus.正常;
            company.Save();


            ///用超级管理员登录 
            var session = new YunUserAPI().Login(Convertor.FromObjectToJson(new { LoginID = superUser.LoginEmail }));
            return session;
        }
        #endregion

        #region 激活人员
        public int ActiveUser(string userID, string securityCode)
        {
            var user = YunUser.Load(userID);
            var companyID = user.CompanyID;

             #region 初始化用户管理App和管理权限
            new YunUserAPI().RegisterApp(companyID,userID, "");
            new YunUserAPI().SetManagerID(userID, true);
            #endregion

            #region 初始化新闻发布App和管理权限
            new WangJun.YunNews.YunNewsWebAPI().RegisterApp(companyID, "");
            new WangJun.YunNews.YunNewsWebAPI().SetManagerID(userID,true);
            #endregion

            #region 初始化文档服务App和管理权限 
            new WangJun.YunDoc.YunDocWebAPI().RegisterApp(companyID, "");
            new WangJun.YunDoc.YunDocWebAPI().PersonalAppInitial(userID, "");
            new WangJun.YunDoc.YunDocWebAPI().SetManagerID(userID, true);

            #endregion

            #region 初始化笔记服务App和管理权限 
            new WangJun.YunNote.YunNoteWebAPI().RegisterApp(companyID, "");
            new WangJun.YunNote.YunNoteWebAPI().PersonalAppInitial(userID, "");
            new WangJun.YunNote.YunNoteWebAPI().SetManagerID(userID, true);
            #endregion

            #region 初始化群组服务App和管理权限 
            new WangJun.YunQun.YunQunWebAPI().RegisterApp(companyID, "");
            new WangJun.YunQun.YunQunWebAPI().PersonalAppInitial(userID, "");
            new WangJun.YunQun.YunQunWebAPI().SetManagerID(userID, true);
            #endregion

            #region 初始化云项目服务App和管理权限 
            new WangJun.YunProject.YunProjectWebAPI().RegisterApp(companyID, "");
            new WangJun.YunProject.YunProjectWebAPI().PersonalAppInitial(userID, "");
            new WangJun.YunProject.YunProjectWebAPI().SetManagerID(userID, true);
            #endregion

            #region 初始化云盘服务App和管理权限  
            new WangJun.YunPan.YunPanWebAPI().RegisterApp(companyID, "");
            new WangJun.YunPan.YunPanWebAPI().PersonalAppInitial(userID, "");
            new WangJun.YunPan.YunPanWebAPI().SetManagerID(userID, true);
            #endregion

            return 0;
        }
        #endregion

    }
    
}
