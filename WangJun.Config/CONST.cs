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
            public static class Status
            {
                public static int 正常 { get { return 1; } }
                public static int 删除 { get { return -1; } } ///等待系统回收

                public static string GetString(int statusCode)
                {
                    if (statusCode == Status.正常)
                    {
                        return "正常";
                    }
                    else if (statusCode == Status.删除)
                    {
                        return "删除";
                    }
                    return "未定义";
                }

            }
            public static class OrgStaff
            {
                public static long Code { get { return 1803001001; } }

                public static string Name { get { return "人员及组织管理"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableStaff { get { return "Staff"; } }

                public static string TableOrg { get { return "Org"; } }

                public static string TableCompany { get { return "Company"; } }

                public static class OrgStatus
                {
                    public static int 正常 { get { return 1; } }
                    public static int 删除 { get { return -1; } } ///等待系统回收

                    public static string GetString(int statusCode)
                    {
                        if(statusCode == OrgStatus.正常)
                        {
                            return "正常";
                        }
                        else if (statusCode == OrgStatus.删除)
                        {
                            return "删除";
                        }
                        return "未定义";
                    }

                }
                public static class StaffStatus
                {
                    public static int 在职 { get { return 1; } }
                    public static int 离职 { get { return 0; } }
                    public static int 删除 { get { return -1; } } ///等待系统回收
                    public static string GetString(int statusCode)
                    {
                        if (statusCode == StaffStatus.在职)
                        {
                            return "在职";
                        }
                        else if (statusCode == StaffStatus.离职)
                        {
                            return "离职";
                        }
                        else if (statusCode == StaffStatus.删除)
                        {
                            return "删除";
                        }
                        return "未定义";
                    }
                }
            }

            public static class YunNote
            {
                public static long Code { get { return 1803001002; } }

                public static string Name { get { return "云笔记"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableYunNote { get { return "YunNote"; } }

                public static string TableComment { get { return "Comment"; } }
                public static class Status
                {
                    public static int 正常 { get { return 1; } }
                    public static int 删除 { get { return -1; } } ///等待系统回收
                    public static string GetString(int statusCode)
                    {
                        if (statusCode == Status.正常)
                        {
                            return "正常";
                        }
                        else if (statusCode == Status.删除)
                        {
                            return "删除";
                        }
                        return "未定义";
                    }
                }
            }

            public static class YunProject
            {
                public static long Code { get { return 1803001003; } }

                public static string Name { get { return "云项目管理"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableYunProject { get { return "YunProject"; } }

                public static string TableComment { get { return "Comment"; } }
                public static class Status
                {
                    
                    public static int 未启动 { get { return 1; } }
                    public static int 进行中 { get { return 2; } }
                    public static int 暂停 { get { return 3; } }
                    public static int 如期完成 { get { return 4; } }
                    public static int 非正常结束 { get { return 5; } } ///目录使用

                    public static int 超期完成 { get { return 6; } } ///目录使用

                    public static int 删除 { get { return -1; } } ///等待系统回收

                    public static string GetString(int statusCode)
                    {
                        if (statusCode == Status.未启动)
                        {
                            return "未启动";
                        }
                        else if (statusCode == Status.进行中)
                        {
                            return "进行中";
                        }
                        else if (statusCode == Status.暂停)
                        {
                            return "暂停";
                        }
                        else if (statusCode == Status.如期完成)
                        {
                            return "如期完成";
                        }
                        else if (statusCode == Status.超期完成)
                        {
                            return "超期完成";
                        }
                        else if (statusCode == Status.删除)
                        {
                            return "删除";
                        }
                        return "未定义";
                    }

                }
            }

            public static class YunPan
            {
                public static long Code { get { return 1803001004; } }

                public static string Name { get { return "云盘"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableYunPan { get { return "YunPan"; } }

                public static string TableComment { get { return "Comment"; } }

                public static class Status
                {
                    public static int 正常 { get { return 1; } }
                    public static int 删除 { get { return -1; } } ///等待系统回收
                    public static string GetString(int statusCode)
                    {
                        if (statusCode == Status.正常)
                        {
                            return "正常";
                        }
                        else if (statusCode == Status.删除)
                        {
                            return "删除";
                        }
                        return "未定义";
                    }
                }

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

            public static class YunNews
            {
                public static long Code { get { return 1803001006; } }

                public static string Name { get { return "新闻发布"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableNews { get { return "YunNews"; } }

                public static string TableComment { get { return "Comment"; } }

                public static class Status
                {
                    public static int 待发布 { get { return 1; } }

                    public static int 已发布 { get { return 2; } }
                    public static int 删除 { get { return -1; } } ///等待系统回收
                    public static string GetString(int statusCode)
                    {
                        if (statusCode == Status.待发布)
                        {
                            return "待发布";
                        }
                        else if (statusCode == Status.已发布)
                        {
                            return "已发布";
                        }
                        else if (statusCode == Status.删除)
                        {
                            return "删除";
                        }
                        return "未定义";
                    }
                }
            }

            public static class YunDoc
            {
                public static long Code { get { return 1803001007; } }

                public static string Name { get { return "文档库"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableYunDoc { get { return "YunDoc"; } }
                public static string TableComment { get { return "Comment"; } }

                public static class Status
                {
                    public static int 正常 { get { return 1; } }
                    public static int 删除 { get { return -1; } } ///等待系统回收
                    public static string GetString(int statusCode)
                    {
                        if (statusCode == Status.正常)
                        {
                            return "正常";
                        }
                        else if (statusCode == Status.删除)
                        {
                            return "删除";
                        }
                        return "未定义";
                    }
                }
            }

            public static class RecycleBin
            {
                public static long Code { get { return 1803001008; } }

                public static string Name { get { return "回收站"; } }

                public static string DB { get { return "WangJun"; } }
                  
                public static string TableRecycleBin { get { return "RecycleBin"; } }


            }

            public static class YunQun
            {
                public static long Code { get { return 1803001009; } }

                public static string Name { get { return "群组"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableCategory { get { return "Category"; } }

                public static string TableYunQun { get { return "YunQun"; } }
                public static string TableComment { get { return "Comment"; } }

                public static class Status
                {
                    public static int 正常 { get { return 1; } }
                    public static int 删除 { get { return -1; } } ///等待系统回收
                    public static string GetString(int statusCode)
                    {
                        if (statusCode == Status.正常)
                        {
                            return "正常";
                        }
                        else if (statusCode == Status.删除)
                        {
                            return "删除";
                        }
                        return "未定义";
                    }
                }
            }

            public static class ClientBehaviorItem
            {
                public static long Code { get { return 1803001010; } }

                public static string Name { get { return "客户行为"; } }

                public static string DB { get { return "WangJun"; } }

                public static string TableClientBehaviorItem { get { return "ClientBehavior"; } }


            }
        }
    }
}
