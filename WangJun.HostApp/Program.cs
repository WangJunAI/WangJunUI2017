using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.AI;
using WangJun.Config;
using WangJun.DB;
using WangJun.Entity;
using WangJun.Net;
using WangJun.Utility;
using WangJun.YunNews;
using WangJun.YunPan;
using static WangJun.Entity.ClientBehaviorItem;

namespace WangJun.HostApp
{
    class Program
    {
        private List<KeyValuePair<string, int>>   hotRankSource = new List<KeyValuePair<string,int>>();
        static void Main(string[] args)
        {
            while (true)
            {
                var db = DataStorage.GetInstance(DBType.MongoDB);
                db.EventTraverse += Db_EventTraverse;
                db.Traverse(CONST.APP.ClientBehaviorItem.DB, CONST.APP.ClientBehaviorItem.TableClientBehaviorItem, "{}");
                LOGGER.Log("下次运行在一分钟后。");
                ThreadManager.Pause(minutes: 2);
            }

        }

        private static void Db_EventTraverse(object sender, EventArgs e)
        {
            var summaryDict = sender as Dictionary<string, object>;
            var ee = e as EventProcEventArgs;
            var data = ee.Default as Dictionary<string, object>;
            var dict = sender as Dictionary<string, object>;

            var behaviorCode = int.Parse(data["BehaviorCode"].ToString());
            var sourceTableName = data["CollectionName"].ToString();
            if ( behaviorCode == BehaviorType.修改 && sourceTableName == CONST.APP.YunQun.TableCategory)
            {
                ///重新创建路径
                ///更新文档目录名称
                //CreateCategoryPath(data);
            }
            else if(behaviorCode == BehaviorType.移除 && sourceTableName == CONST.APP.YunQun.TableCategory)
            {
                ///将该目录下文档进行移除，将相关分词移除
            }
            else if (behaviorCode == BehaviorType.删除 && sourceTableName == CONST.APP.YunQun.TableCategory)
            {
                ///将该目录下文档进行删除，将相关分词删除
            }
            else if (behaviorCode == BehaviorType.修改 && sourceTableName == CONST.APP.YunDoc.TableYunDoc)
            {
                //FenCiProc(data);
            }
            else if (behaviorCode == BehaviorType.修改 && sourceTableName == CONST.APP.YunNews.TableNews)
            {
               // FenCiProc(data);
                //CreateHotCount(data);
            }
            else if (behaviorCode == BehaviorType.修改 && sourceTableName == CONST.APP.YunNote.TableYunNote)
            {
                //FenCiProc(data);
            }
            else if (behaviorCode == BehaviorType.修改 && sourceTableName == CONST.APP.YunPan.TableYunPan)
            {
                YunPanFileMigrate(data);
                ///分享数
            }
            else if (behaviorCode == BehaviorType.修改 && sourceTableName == CONST.APP.YunProject.TableYunProject)
            {
               ///各种超时计算，生成老板报表
            }


            ///遇到删除状态的进行删除
            ///
            LOGGER.Log("处理");
        }

        #region 转移云盘文件
        public static void YunPanFileMigrate(Dictionary<string, object> data)
        {
            var tableName = data["CollectionName"].ToString();
            var dbID = data["DbID"].ToString();
            var source = YunPanItem.Load(dbID);


            var fileHttpUrl = source.FileHttpUrl;
            var serverFileName = source.ServerFileName;
            var directory = @"C:\YunPan\";
            var localFilePath = directory + serverFileName;
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            if (!File.Exists(localFilePath))
            {
                HTTP.GetInstance().SaveFile(fileHttpUrl, localFilePath);
            }

        }
        #endregion

        #region 分词
        public static void FenCiProc(Dictionary<string, object> data)
        {
            var tableName = data["CollectionName"].ToString();
            var dbID = data["DbID"].ToString();
            var source = YunNewsItem.Load(dbID);
            var plainText = source.PlainText;
             var res = FenCi.GetResult(plainText); ///分词结果存储数据库
            DataStorage.GetInstance(DBType.MongoDB).Remove("WangJun", "FenCi", "{'SourceID':ObjectId('" + dbID + "')}");
            foreach (var fenciItem in res)
            {
                var svItem = new { SourceID = Convertor.StringToObjectID(dbID), Word = fenciItem.Key, Count = fenciItem.Value, TableName = tableName };
                DataStorage.GetInstance(DBType.MongoDB).Save3("WangJun", "FenCi", svItem);
            }

        }
        #endregion

        #region 创建路径
        public static void CreateCategoryPath(Dictionary<string, object> data)
        {
            var tableName = data["CollectionName"].ToString();
            var dbID = data["DbID"].ToString();
            var source = YunNews.CategoryItem.Load(dbID);
            var categoryList = DataStorage.GetInstance(DBType.MongoDB).Find3("WangJun", "Category", "{'CompanyID':'" + source.CompanyID + "'}");
            var stack = new Stack<string>();
            stack.Push(source.ID);
            var currentID = source.ParentID;
            var  path = "";
            while (currentID != "000000000000000000000000")
            {
                var parentQuery = from item in categoryList where item["ID"].ToString() == currentID select item;
                if (0 < parentQuery.Count())
                {
                    stack.Push(parentQuery.First()["ID"].ToString());
                    path = parentQuery.First()["Name"].ToString() +"/"+ path;
                    currentID = parentQuery.First()["ParentID"].ToString();
                }
            }
            source.Path = path;
            source.Save();

            return;
        }
        #endregion

        #region 生成热度值
        public static void CreateHotCount(Dictionary<string, object> data)
        {
            var tableName = data["CollectionName"].ToString();
            var dbID = data["DbID"].ToString();
            var source = YunNewsItem.Load(dbID);
            var likeCount = source.LikeCount;
            var favoriteCount = source.FavoriteCount;
            var readCount = source.ReadCount;
            var commentCouunt = source.CommentCount;
            source.HotCount = likeCount + favoriteCount + readCount + commentCouunt;
            source.Save();
            

        }
        #endregion

        #region 完善数据,维护服务

        #endregion
    }
}
