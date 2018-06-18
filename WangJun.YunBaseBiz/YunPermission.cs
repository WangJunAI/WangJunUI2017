using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.Yun
{
    public class YunPermission:BasePermission
    {
        public YunPermission() {
            var iSysItem = this as ISysItem;
            iSysItem.ClassFullName = this.GetType().FullName;
            iSysItem._DbName = "WangJun";
            iSysItem._CollectionName = "YunPermission";
            var iTime = this as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = DateTime.Now;
        }

        public static List<YunPermission> Load(string userID,string objectID,long appCode,int behaviorType)
        {
            var operatorID = SUID.FromStringToGuid(userID);
            var query = string.Format("{{'OperatorID':UUID('{0}'),'ObjectID':UUID('{0}')}}", operatorID, objectID);
            var permissionList = EntityManager.GetInstance().Find<YunPermission>(query);

            var res = EntityManager.GetInstance().Find<YunPermission>(p => p.OperatorID == operatorID);
            return permissionList;
        }

        public static List<YunPermission> LoadAppPermission(string userID)
        {
            var operatorID = SUID.FromStringToGuid(userID);
            var query = string.Format("{{'OperatorID':UUID('{0}')}}", operatorID);
            var permissionList = EntityManager.GetInstance().Find<YunPermission>(query);

            var res = EntityManager.GetInstance().Find<YunPermission>(p => p.OperatorID == operatorID);
            return permissionList;
        }

        public static bool CanManageApp(string userID, long appCode)
        {
            var operatorID = SUID.FromStringToGuid(userID);
            var objectID = SUID.FromStringToGuid("FFFFFFFFFFFFFF" + appCode);
            var query = string.Format("{{'OperatorID':UUID('{0}'),'ObjectID':UUID('{0}')}}", operatorID, objectID);
            var permissionList = EntityManager.GetInstance().Find<YunPermission>(query);

            var res = EntityManager.GetInstance().Find<YunPermission>(p => p.OperatorID == operatorID && p.ObjectID == objectID);
            return 1 ==permissionList.Count();
        }

        public static List<YunPermission> LoadSharePermission(string userID, long appCode,int behaviorType)
        {
            var operatorID = SUID.FromStringToGuid(userID);
            var query = string.Format("{{'OperatorID':UUID('{0}'),'AppCode':{1},'BehaviorType':{2}}}", operatorID, appCode, behaviorType);
            var permissionList = EntityManager.GetInstance().Find<YunPermission>(query);

            var res = EntityManager.GetInstance().Find<YunPermission>(p => p.OperatorID == operatorID && p.AppCode == appCode);
            return permissionList;
        }

        public static List<YunPermission> LoadArticlePermission(string userID, string objectID)
        {
            var operatorID = SUID.FromStringToGuid(userID);
            var articleID = SUID.FromStringToGuid(objectID);
            var query = string.Format("{{'ObjectID':UUID('{0}'),'OperatorID':UUID('{1}')}}", articleID, operatorID);
            var permissionList = EntityManager.GetInstance().Find<YunPermission>(query);

            var res = EntityManager.GetInstance().Find<YunPermission>(p => p.OperatorID == operatorID && p.ObjectID == articleID);
            return permissionList;

        }


        public int Save()
        {
            var iSysItem = this as ISysItem;
            if (Guid.Empty == this._ID) {
                this._ID = SUID.New();
            }
            if (null != iSysItem)
            {
                EntityManager.GetInstance().Save<YunPermission>(this);
                return (int)EnumResult.成功;
            }
            return (int)EnumResult.失败;
        }

        public static int Remove(string id)
        {
            return 0;
        }
         
    }
}
