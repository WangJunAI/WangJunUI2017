using System;
using WangJun.Entity;
using WangJun.HumanResource;
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

            #region 初始化App
            HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.App.YunUserAPI&m=RegisterApp&p0=" + company.ID + "&p1=01");
            #endregion

            #region 初始化App
            //HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=RegisterApp&p0=" + company.ID + "&p1=01");
            #endregion

            #region 初始化App
            //HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=RegisterApp&p0=" + company.ID + "&p1=01");
            #endregion

            var sessionStr = HTTP.GetInstance().GetString("http://localhost:9990/API.ashx?c=WangJun.Yun.YunUser&m=Login&p0=" + Convertor.FromObjectToJson(new { LoginID = superUser.LoginEmail }));

            return Convertor.FromJsonToObject2<SESSION>(sessionStr);
        }
        #endregion

        #region 激活人员
        public int ActiveStaff(string staffID)
        {
 
            return 0;
        }
        #endregion

    }
    
}
