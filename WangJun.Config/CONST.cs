using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Config
{
    public static class CONST
    {
        public static class APP
        {
            public static class OrgStaff
            {
                public static long Code { get { return 1803001001; } }

                public static string Name { get { return "人员及组织管理"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableStaff { get { return "Staff"; } }

                public static string TableOrg { get { return "Org"; } }

                public static string TableCompany { get { return "Company"; } }
            }

            public static class YunNote
            {
                public static long Code { get { return 1803001002; } }

                public static string Name { get { return "云笔记"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableYunNote { get { return "YunNote"; } }

            }

            public static class YunProject
            {
                public static long Code { get { return 1803001003; } }

                public static string Name { get { return "云项目管理"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableYunProject { get { return "YunProject"; } }

            }

            public static class YunPan
            {
                public static long Code { get { return 1803001004; } }

                public static string Name { get { return "云盘"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableYunPan { get { return "YunPan"; } }

            }

            public static class Workflow
            {
                public static long Code { get { return 1803001005; } }

                public static string Name { get { return "工作流"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableMap { get { return "WorkflowMap"; } }

                public static string TableTask { get { return "WorkflowTask"; } }
                 

            }

            public static class News
            {
                public static long Code { get { return 1803001006; } }

                public static string Name { get { return "新闻发布"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableNews { get { return "News"; } }

                public static string TableComment { get { return "NewsComment"; } }

            }

            public static class Doc
            {
                public static long Code { get { return 1803001007; } }

                public static string Name { get { return "文档库"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableNews { get { return "Doc"; } }


            }

            public static class RecycleBin
            {
                public static long Code { get { return 1803001008; } }

                public static string Name { get { return "回收站"; } }

                public static string DB { get { return "WangJun"; } }
                 

                public static string TableRecycleBin { get { return "RecycleBin"; } }


            }
        }
    }
}
