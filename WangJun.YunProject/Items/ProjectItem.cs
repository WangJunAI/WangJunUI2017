using System.Collections;
using System.Collections.Generic;
using WangJun.Config;
using WangJun.Entity;
using WangJun.HumanResource;
using WangJun.Utility;

namespace WangJun.YunProject
{
    /// <summary>
    /// 文档实体 
    /// </summary>
    public class ProjectItem : BaseItem
    {
        public ProjectItem()
        {
            this._DbName = CONST.APP.YunProject.DB;
            this._CollectionName = CONST.APP.YunProject.TableYunProject;
            this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = CONST.APP.YunProject.Code;
            this.AppName = CONST.APP.YunProject.Name;
            this.StatusCode = CONST.APP.YunProject.Status.未启动;
            this.Status = CONST.APP.YunProject.Status.GetString(this.StatusCode);

        }

        public string ShowMode { get; set; }

        public string Title { get; set; }

        public string Keyword { get; set; }

        public string Content { get; set; }

        public int ContentLength { get; set; }

        public string PlainText { get; set; }

        public int PlainTextLength { get; set; }

        public string Summary { get; set; }
 

        public int CommentCount { get; set; }

 
        public ArrayList Milestone  { get;set;}


        /// <summary>
        /// [OK]
        /// </summary>
        public void Save()
        {
            EntityManager.GetInstance().Save<ProjectItem>(this);
            ClientBehaviorItem.Save(this, ClientBehaviorItem.BehaviorType.修改, SESSION.Current);
        }
        public static void Save(string jsonInput)
        {
            var dict = Convertor.FromJsonToDict2(jsonInput);
            var inst = new ProjectItem();
            if (dict.ContainsKey("ID") && null != dict["ID"])
            {
                inst.ID = dict["ID"].ToString();
            }
            inst = EntityManager.GetInstance().Get<ProjectItem>(inst);
            var milestone = new ArrayList();
            if(dict.ContainsKey("Milestone"))
            {
                milestone = dict["Milestone"] as ArrayList;
                dict.Remove("Milestone");
            }
            foreach (var kv in dict)
            {
                var property = inst.GetType().GetProperty(kv.Key);
                if (property.CanWrite)
                {
                    property.SetValue(inst, kv.Value);
                }
            }
            inst.Milestone = new ArrayList();
            foreach (Dictionary<string,object> milestoneItem in milestone)
            {
                var item = new { Title = milestoneItem["Title"], Summary = milestoneItem["Summary"], TaskArray = new ArrayList(), Status = "已完成" };
                foreach (Dictionary<string, object> taskItem in milestoneItem["TaskArray"] as ArrayList)
                {
                    if (0 < taskItem.Count)
                    {
                        item.TaskArray.Add(new { Content = taskItem["Content"], ExpectedEndTime = taskItem["ExpectedEndTime"], Status = taskItem["Status"] ,ID= taskItem["ID"] });
                    }
                    else
                    {
                        //item.TaskArray.Add(new {  Status = "新增按钮" });

                    }
                }
                inst.Milestone.Add(item);
            }


             inst.Save();


            #region 创建共享文档
            if (null != inst.UserAllowedArray)
            {
                var redirectID = inst.ID;
                foreach (string id in inst.UserAllowedArray)
                {
                    var staff = StaffItem.Load(id);
                    inst.ID = null;
                    inst.Name =   inst.Name;
                    inst.Title =  inst.Title;
                    inst._RedirectID = redirectID;
                    inst.OwnerID = id;
                    inst.Save();
                }
            }
            #endregion
        }
        public void Remove()
        {
            EntityManager.GetInstance().Remove(this);

        }

    }
}
