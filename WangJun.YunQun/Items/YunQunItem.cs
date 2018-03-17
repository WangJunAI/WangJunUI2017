﻿using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using WangJun.Config;
using WangJun.DB;
using WangJun.Entity;
using WangJun.HumanResource;
using WangJun.Utility;

namespace WangJun.YunQun
{
    /// <summary>
    /// 文档实体 
    /// </summary>
    public class YunQunItem: BaseItem
    {
        public YunQunItem()
        {
            this._DbName = CONST.APP.YunQun.DB;
            this._CollectionName = CONST.APP.YunQun.TableYunQun;
            this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = CONST.APP.YunQun.Code;
            this.AppName = CONST.APP.YunQun.Name;
            this.StatusCode = CONST.APP.YunQun.Status.正常;
            this.Status = CONST.APP.YunQun.Status.GetString(this.StatusCode);
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
         

        /// <summary>
        /// [OK]
        /// </summary>
        public void Save()
        {
            EntityManager.GetInstance().Save<YunQunItem>(this);
            ClientBehaviorItem.Save(this, ClientBehaviorItem.BehaviorType.修改, SESSION.Current);
        }
        public static void Save(string jsonInput)
        {
            var dict = Convertor.FromJsonToDict2(jsonInput);
            var inst = new YunQunItem();
            if (dict.ContainsKey("ID") && null != dict["ID"])
            {
                inst.ID = dict["ID"].ToString();
            }
            inst = EntityManager.GetInstance().Get<YunQunItem>(inst);
            foreach (var kv in dict)
            {
                var property = inst.GetType().GetProperty(kv.Key);
                if (property.CanWrite)
                {
                    property.SetValue(inst, kv.Value);
                }
            }
            inst.Name = "[" + SESSION.Current.UserName + "]" + inst.Name;///调试用
            inst.Title = "[" + SESSION.Current.UserName + "]" + inst.Title;///调试用
            inst.Save();

            #region 创建共享文档
            if (null != inst.UserAllowedArray)
            {
                var redirectID = inst.ID;
                foreach (string id in inst.UserAllowedArray)
                {
                    var staff = StaffItem.Load(id);
                    inst.ID = null;
                    inst.Name = "[共享给" + staff.Name + "]" + inst.Name;
                    inst.Title = "[共享给" + staff.Name + "]" + inst.Title;
                    inst._RedirectID = redirectID;
                    inst.OwnerID = id;
                    inst.Save();
                }
            }
            #endregion
        }
 

    }
}
