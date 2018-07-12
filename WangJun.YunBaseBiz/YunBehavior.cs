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
            var readCount = 0;
            var likeCount = 0;
            var commentCount = 0;
            var favoriteCount = 0;
 

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
                    likeCount = ((int)EnumBehaviorType.点赞 == operateTypeCode) ? -1 : 0;
                    favoriteCount = ((int)EnumBehaviorType.收藏 == operateTypeCode) ? -1 : 0;
                }
                else
                {
                    EntityManager.GetInstance().Save<YunBehavior>(inst);
                    likeCount = ((int)EnumBehaviorType.点赞 == operateTypeCode) ? 1 : 0;
                    favoriteCount = ((int)EnumBehaviorType.收藏 == operateTypeCode) ? 1 : 0;
                }
            }
            else if ((int)EnumBehaviorType.阅读 == operateTypeCode)
            {
                EntityManager.GetInstance().Save<YunBehavior>(inst);

                readCount = 1;
            }
             
            if (targetTypeCode == (int)EnumBizType.文章)
            {
                var target = YunArticle.Load(SUID.FromGuidToObjectId(targetID).ToString());
                target.ReadCount += readCount;
                target.LikeCount += likeCount;
                target.FavoriteCount += favoriteCount;
                target.CommentCount += commentCount;
                target.Save();
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
