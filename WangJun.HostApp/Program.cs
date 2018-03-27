using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.AI;
using WangJun.Config;
using WangJun.DB;
using WangJun.Net;
using WangJun.Utility;

namespace WangJun.HostApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var tableArray = new List<string> { CONST.APP.OrgStaff.TableCompany, CONST.APP.OrgStaff.TableOrg, CONST.APP.OrgStaff.TableStaff
                                                                    , CONST.APP.RecycleBin.TableRecycleBin
                                                                    , CONST.APP.YunDoc.TableCategory, CONST.APP.YunDoc.TableComment, CONST.APP.YunDoc.TableYunDoc
                                                                    , CONST.APP.YunNews.TableCategory, CONST.APP.YunNews.TableComment, CONST.APP.YunNews.TableNews
                                                                    , CONST.APP.YunNote.TableCategory, CONST.APP.YunNote.TableComment, CONST.APP.YunNote.TableYunNote
                                                                    , CONST.APP.YunPan.TableCategory, CONST.APP.YunPan.TableComment, CONST.APP.YunPan.TableYunPan
                                                                    , CONST.APP.YunProject.TableCategory, CONST.APP.YunProject.TableComment, CONST.APP.YunProject.TableYunProject
                                                                    , CONST.APP.YunQun.TableCategory, CONST.APP.YunQun.TableComment, CONST.APP.YunQun.TableYunQun,
                                                                    CONST.APP.ClientBehaviorItem.TableClientBehaviorItem
                                                                    };
            var db = DataStorage.GetInstance(DBType.MongoDB);
            db.EventTraverse += Db_EventTraverse;
            foreach (var collectionName in tableArray)
            {
                db.Traverse("WangJun", collectionName, "{}");
            }
        }

        private static void Db_EventTraverse(object sender, EventArgs e)
        {
            var summaryDict = sender as Dictionary<string, object>;
            var ee = e as EventProcEventArgs;
            var data = ee.Default as Dictionary<string, object>;
            var dict = sender as Dictionary<string, object>;
            var tableName = dict["TableName"].ToString();
           
            if(tableName == CONST.APP.YunQun.TableCategory)
            {
                ///计算目录路径,目录深度,修正文档名称
                var companyID = data["CompanyID"].ToString();
                var categoryList = DataStorage.GetInstance(DBType.MongoDB).Find3("WangJun", "Category", "{'CompanyID':'" + companyID + "'}");
                var stack = new Stack<string>();
                stack.Push(data["ID"].ToString());
                var currentID = data["ParentID"].ToString();
                while(currentID!= "000000000000000000000000")
                {
                    var parentQuery = from item in categoryList where item["ID"].ToString() == currentID select item ;
                    if(0<parentQuery.Count())
                    {
                        stack.Push(parentQuery.First()["ID"].ToString());
                        currentID = parentQuery.First()["ParentID"].ToString();
                    }
                }


                

            }
            else if(tableName == CONST.APP.YunDoc.TableYunDoc|| tableName == CONST.APP.YunNews.TableNews 
                || tableName == CONST.APP.YunNote.TableYunNote || tableName == CONST.APP.YunProject.TableYunProject )
            {
                ///分词和推送服务
                var plainText = data["PlainText"].ToString();
                var ID = data["ID"].ToString();
                var res = FenCi.GetResult(plainText); ///分词结果存储数据库
                foreach (var fenciItem in res)
                {
                    var svItem = new { SourceID = ID, Word = fenciItem.Key, Count = fenciItem.Value, TableName = tableName };
                    DataStorage.GetInstance(DBType.MongoDB).Save3("WangJun", "FenCi", svItem);
                }
            }
            else if(tableName == CONST.APP.YunQun.TableComment)
            {
                //推送服务
            }
            else if (tableName == CONST.APP.ClientBehaviorItem.TableClientBehaviorItem)
            {
                //行为分析,数据矫正
            }
            else if(tableName == CONST.APP.YunPan.TableYunPan)
            {
                ///转移云盘文件,下载文件,保存在指定位置,检查文件是否存在
                var fileHttpUrl = data["FileHttpUrl"].ToString();
                var serverFileName = data["ServerFileName"].ToString();

                new HTTP().SaveFile(fileHttpUrl, @"E:\test\"+ serverFileName);
                ///修改记录,删除站点数据
            }

            ///遇到删除状态的进行删除
            ///
            Console.WriteLine("Tets");
        }

        #region 转移云盘文件

        #endregion

        #region 分词

        #endregion

        #region 生成排行榜

        #endregion

        #region 完善数据,维护服务

        #endregion
    }
}
