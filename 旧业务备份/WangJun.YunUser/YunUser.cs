using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.Yun
{
    public class YunUser:BaseUser
    {
        public YunUser()
        {
            var iSysItem = this as ISysItem;
            iSysItem.ClassFullName = this.GetType().FullName;
            iSysItem._DbName = "WangJun";
            iSysItem._CollectionName = "YunUser";
        }

        #region 保存
        /// <summary>
        /// 保存
        /// </summary>
        /// <returns></returns>
        public int Save()
        {
            var session = SESSION.Current;
            var iRelationshipObjectId = this as IRelationshipObjectId;
            var iTime = this as ITime;
            var iOperator = this as IOperator;
            var iCompany = this as ICompany;
            var iStatus = this as IStatus;
            var iSysItem = this as ISysItem;


            #region iRelationshipObjectId
            if (null != iRelationshipObjectId && iRelationshipObjectId._OID == ObjectId.Empty) ///新对象
            {
                iRelationshipObjectId._OID = ObjectId.GenerateNewId();
            }
            #endregion

            #region ITime
            if (null != iTime && iTime.CreateTime == DateTime.MinValue) ///新对象
            {
                iTime.CreateTime = DateTime.Now;
                iTime.UpdateTime = DateTime.Now;
            }
            #endregion

            #region IOperator
            if (null != iOperator && string.IsNullOrWhiteSpace(iOperator.CreatorID)) ///新对象
            {
                iOperator.CreatorID = session.UserID;
                iOperator.CreatorName = session.UserName;
                iOperator.ModifierID = session.UserID;
                iOperator.ModifierName = session.UserName;
                if (StringChecker.IsZeroString(iOperator.OwnerID)) ///企业的应该界面赋值
                {
                    iOperator.OwnerID = session.UserID; ///数据所有者
                    iOperator.OwnerName = session.UserName;
                }
            }
            #endregion

            #region ICompany
            if (null != iCompany && string.IsNullOrWhiteSpace(iCompany.CompanyID))
            {
                iCompany.CompanyID = session.CompanyID;
                iCompany.CompanyName = session.CompanyName;
            }
            #endregion
             

            #region IStatus
            if (null != iStatus && string.IsNullOrWhiteSpace(iStatus.Status))
            {
                iStatus.StatusCode = (int)EnumStatus.正常;
                iStatus.Status = EnumStatus.正常.ToString();
            }
            #endregion

            #region iSysItem
            if (null != iSysItem)
            {
                EntityManager.GetInstance().Save<YunUser>(this);
                return (int)EnumResult.成功;
            }
            #endregion

            return (int)EnumResult.失败;
        }
        #endregion

        public static YunUser Load(string id)
        {
            var res = EntityManager.GetInstance().Get<YunUser>(id);
            return res;
        }

        public static int Remove(string id)
        {
            return EntityManager.GetInstance().Remove<YunUser>(id);
        }

        public static int Delete(string id)
        {
            return EntityManager.GetInstance().DeleteOne<YunUser>(id);
        }

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="jsonInput"></param>
        /// <returns></returns>
        public SESSION Login(string jsonInput)
        {
            var dict = Convertor.FromJsonToDict2(jsonInput);
            var loginID = dict["LoginID"].ToString();
            var session = new SESSION();
             var query = "{'LoginEmail':'" + loginID + "'}";
            var res = EntityManager.GetInstance().Get<YunUser>("WangJun", "YunUser", query);
            var res2 = EntityManager.GetInstance().Get<YunUser>(p => p.LoginEmail == loginID);


            ///查找权限
            var permissionList = YunPermission.LoadAppPermission(res.ID);

            #region session设置
            session.UserID = res.ID;
            session.UserName = res.NickName;
            session.CompanyID = res.CompanyID;
            session.CompanyName = res.CompanyName;
            session.IsSuperAdmin = true;
            session.CanManageYunNews = true;
            session.CanManageYunDoc = true;
            session.CanManageYunNote = true;
            session.CanManageYunQun=true;
            session.CanManageStaff = true;
            session.CanManageYunPan = true;
            session.CanManageYunProject = true;
            SESSION.Set(session);
            #endregion
            return session;
        }

        #region 基本方法
        public static YunUser CreateAsSuperAdmin(string loginEmail,ICompany iCompany)
        {
            var inst = new YunUser();
            inst._GID = SUID.New();
            inst.NickName = "超级管理员";
            inst.LoginEmail = loginEmail;

            inst.CompanyID = iCompany.CompanyID;
            inst.CompanyName = iCompany.CompanyName;

            inst.RootID = iCompany.CompanyID;
            inst.RootName = iCompany.CompanyName;

            inst.UserType = (int)EnumUser.SuperAdmin;


            return inst;
        }
        #endregion
    }
}
