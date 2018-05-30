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

            EntityManager.GetInstance().Save<YunBehavior>(inst);



        }
    }
}
