using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.Yun
{
    public class YunBehavior:BaseBehavior
    {
        public YunBehavior()
        {

            var iSysItem = this as ISysItem;
            iSysItem.ClassFullName = this.GetType().FullName;
            iSysItem._DbName = "WangJun";
            iSysItem._CollectionName = "YunBehavior";
            this._GID = SUID.New();
        }

        public static void Save(
            int operateTypeCode,string operateType,int targetTypeCode,string targetType
            , Guid operatorID, string operatorName, Guid targetID, string targetName
            , long appCode, string appName,string companyID,string companyName
            )
        {


            var inst = new YunBehavior();
            inst.CreateTime = DateTime.Now;

            if (string.IsNullOrWhiteSpace(inst.ID))
            {
                inst.ID = SUID.New().ToString().Replace("-", string.Empty).Substring(8);
            }

            inst.OperateTypeCode = operateTypeCode;
            inst.OperateType = operateType;
            inst.TargetTypeCode = targetTypeCode;
            inst.TargetType = targetType;
            inst.OperatorID = operatorID;
            inst.OperatorName = operatorName;
            inst.TargetID = targetID;
            inst.TargetName = targetName;
            inst.AppCode = appCode;
            inst.AppName = appName;
            inst.CompanyID = companyID;
            inst.CompanyName = companyName;

            if ((int)EnumBehaviorType.收藏 == operateTypeCode || (int)EnumBehaviorType.点赞 == operateTypeCode)
            {
                var list = YunBehavior.LoadBehaviorList(inst.TargetID.ToString(), inst.OperatorID.ToString()).Where(p => p.OperateTypeCode == operateTypeCode);

                if (0 < list.Count())
                {
                    foreach (var listItem in list)
                    {
                        YunBehavior.Remove(listItem.ID);
                    }

                }
                else
                {
                    EntityManager.GetInstance().Save<YunBehavior>(inst);
                }
            }
            else if ((int)EnumBehaviorType.阅读 == operateTypeCode)
            {
                EntityManager.GetInstance().Save<YunBehavior>(inst);
            }

        }

        public static int Remove(string id) { 
              EntityManager.GetInstance().DeleteOne<YunBehavior>(id);
            return (int)EnumResult.成功;
        }

        public static List<YunBehavior> LoadBehaviorList(string objectId,string operatorId=null)
        {
            var list = new List<YunBehavior>();
            var objID = SUID.FromStringToGuid(objectId);
            var opeID = SUID.FromStringToGuid(operatorId);
            if (!string.IsNullOrWhiteSpace(operatorId))
            {
                var query = "{'OperatorID':UUID('" + opeID + "'),'TargetID':UUID('" + objID + "')}";
                list = EntityManager.GetInstance().Find<YunBehavior>(query);
                var res = EntityManager.GetInstance().Find<YunBehavior>(p => p.OperatorID == opeID && p.TargetID == objID);
            }
            else
            {
                var query = "{'TargetID':UUID('" + SUID.FromStringToGuid(objectId) + "')}";
                list = EntityManager.GetInstance().Find<YunBehavior>(query);
                var res = EntityManager.GetInstance().Find<YunBehavior>(p => p.TargetID == objID);

            }
            return list;
        }
    }
}
