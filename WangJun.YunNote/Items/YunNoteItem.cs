﻿using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using WangJun.Config;
using WangJun.DB;
using WangJun.Entity;
using WangJun.HumanResource;
using WangJun.Utility;

namespace WangJun.YunNote
{
    /// <summary>
    /// 文档实体 
    /// </summary>
    public class YunNoteItem: BaseItem
    {
        public YunNoteItem()
        {
            this._DbName = CONST.APP.YunNote.DB;
            this._CollectionName = CONST.APP.YunNote.TableYunNote;
            this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = CONST.APP.YunNote.Code;
            this.AppName = CONST.APP.YunNote.Name;
            this.StatusCode = CONST.APP.YunNote.Status.正常;
            this.Status = CONST.APP.YunNote.Status.GetString(this.StatusCode);
        }

        public string ShowMode { get; set; }

        public string Title { get; set; }

        public string Keyword { get; set; }

        public string Content { get; set; }

        public int ContentLength { get; set; }

        public string PlainText { get; set; }

        public int PlainTextLength { get; set; }

        public string Summary { get; set; }
 
        public int ReadCount { get; set; }

        public int LikeCount { get; set; }

        public int CommentCount { get; set; }

        public string ImageUrl { get; set; }
 
        public DateTime PublishTime { get; set; }

        public string PublishMode { get; set; }

        public string Permission { get; set; }


        /// <summary>
        /// [OK]
        /// </summary>
        public void Save()
        {
            EntityManager.GetInstance().Save<YunNoteItem>(this);
        }
        public static void Save(string jsonInput)
        {
            var dict = Convertor.FromJsonToDict2(jsonInput);
            var inst = new YunNoteItem();
            if (dict.ContainsKey("ID") && null != dict["ID"])
            {
                inst.ID = dict["ID"].ToString();
            }
            inst = EntityManager.GetInstance().Get<YunNoteItem>(inst);
            foreach (var kv in dict)
            {
                inst.GetType().GetProperty(kv.Key).SetValue(inst, kv.Value);
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
