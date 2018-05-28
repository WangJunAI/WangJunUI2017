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
            var company = YunCompany.Parse(jsonString);

            #region 创建公司
            company.Save();
            #endregion

            #region 初始化组织信息
            var rootOrg = YunCategory.CreateAsNew(company.Name);
            rootOrg.Name = company.Name;
            rootOrg.RootID = company.ID;
            rootOrg.RootName = company.Name;
            rootOrg.CompanyID = company.ID;
            rootOrg.CompanyName = company.Name;
            rootOrg.OwnerID = company.ID;
            rootOrg.Save();
            #endregion


            #region 创建超级管理员
            var superUser = YunUser.CreateAsAdmin(company.SuperAdminEmail,company);
            superUser.Save();
            #endregion

            return SESSION.Current;
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
