using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Config;
using WangJun.DB;
using WangJun.Utility;

namespace WangJun.Entity
{
    public class ClientBehaviorItem :SysItem
    {
        public ClientBehaviorItem()
        {
            this._DbName = CONST.APP.ClientBehaviorItem.DB;
            this._CollectionName = CONST.APP.ClientBehaviorItem.TableClientBehaviorItem;
            this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = CONST.APP.ClientBehaviorItem.Code;
            this.AppName = CONST.APP.ClientBehaviorItem.Name;
 
        }
         
        public ObjectId _id { get; set; }
        public ObjectId UserID { get; set; }
         
        public string UserName { get; set; }

        public string DbName { get; set; }

        public string CollectionName { get; set; }

        public ObjectId DbID { get; set; }

        public string Behavior { get; set; }

        public int BehaviorCode { get; set; } 

        public DateTime CreateTime { get; set; }

        public DateTime ProcTime { get; set; }

        public int Date { get { return int.Parse(string.Format("{0:yyyyMMdd}", DateTime.Now)); } }

        public static class BehaviorType {
            public static int 获取 { get { return  1; } }
            public static int 修改 { get { return 2; } }
            public static int 移除 { get { return 3; } }
            public static int 删除 { get { return 4; } }

            public static int 搜索 { get { return 5; } }

            public static int 点赞 { get { return 6; } }
            
            public static int 收藏 { get { return 8; } }

            public static string GetString(int behaviorType)
            {
                if(behaviorType == BehaviorType.修改)
                {
                    return "修改";
                }
                else if (behaviorType == BehaviorType.删除)
                {
                    return "删除";
                }
                else if (behaviorType == BehaviorType.搜索)
                {
                    return "搜索";
                }
                else if (behaviorType == BehaviorType.移除)
                {
                    return "移除";
                }
                else if (behaviorType == BehaviorType.搜索)
                {
                    return "搜索";
                }
                else if (behaviorType == BehaviorType.点赞)
                {
                    return "点赞";
                }
                else if (behaviorType == BehaviorType.收藏)
                {
                    return "收藏";
                }

                return "未定义";
            }
        }

        public bool IsEmpty
        {
            get
            {
                return this.DbID == ObjectId.Empty;
            }
        }
        public static void Save(BaseItem item,int behaviorType,SESSION session)
        {
            var task = new TaskFactory().StartNew(() => {
                try
                {
                    var inst = new ClientBehaviorItem();
                    inst._id = ObjectId.GenerateNewId();
                    inst.UserID = Convertor.StringToObjectID(session.UserID);
                    inst.UserName = session.UserName;
                    inst.CreateTime = DateTime.Now;
                    inst.BehaviorCode = behaviorType;
                    inst.Behavior = BehaviorType.GetString(behaviorType);
                    inst.DbName = item._DbName;
                    inst.CollectionName = item._CollectionName;
                    inst.DbID = item._OID;
                    var db = DataStorage.GetInstance(DBType.MongoDB);

                    db.Save3(item._DbName, "ClientBehavior", inst);
                }
                catch(Exception e)
                {

                }
            });


        } 

        public void Remove()
        {
            var query = MongoDBFilterCreator.SearchByObjectId(this._id.ToString());
            DataStorage.GetInstance(DBType.MongoDB).Remove("WangJun", "ClientBehavior", query);
        }
    }
}
