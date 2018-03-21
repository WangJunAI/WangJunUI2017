using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Config;
using WangJun.DB;
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
                                                                    , CONST.APP.YunQun.TableCategory, CONST.APP.YunQun.TableComment, CONST.APP.YunQun.TableYunQun
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
            Console.WriteLine("{0}",ee.Default);
        }
    }
}
