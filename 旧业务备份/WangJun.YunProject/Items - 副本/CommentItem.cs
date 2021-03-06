﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Config;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.YunProject
{

    public class CommentItem : BaseItem
    {
        public CommentItem()
        {
            this._DbName = CONST.APP.YunProject.DB;
            this._CollectionName = CONST.APP.YunProject.TableComment;
            this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = CONST.APP.YunProject.Code;
            this.AppName = CONST.APP.YunProject.Name;
            this.StatusCode = CONST.APP.Status.正常;
            this.Status = CONST.APP.Status.GetString(this.StatusCode);
        }

        public int LikeCount { get; set; }

        public string Content { get; set; }
        /// <summary>
        /// [OK]
        /// </summary>
        public void Save()
        {
            EntityManager.GetInstance().Save<CommentItem>(this);
            ClientBehaviorItem.Save(this, ClientBehaviorItem.BehaviorType.修改, SESSION.Current);
        }
        public static void Save(string jsonInput)
        {
            var dict = Convertor.FromJsonToDict2(jsonInput);
            var inst = new CommentItem();
            if (dict.ContainsKey("ID") && null != dict["ID"])
            {
                inst.ID = dict["ID"].ToString();
            }
            inst = EntityManager.GetInstance().Get<CommentItem>(inst);
            foreach (var kv in dict)
            {
                var property = inst.GetType().GetProperty(kv.Key);
                if (property.CanWrite)
                {
                    property.SetValue(inst, kv.Value);
                }
            }
            inst.Save();

            var yunQun = new ProjectItem();
            yunQun.ID = inst.RootID;
            yunQun = EntityManager.GetInstance().Get<ProjectItem>(yunQun);
            yunQun.LastestCommentTime = DateTime.Now;
            yunQun.Save();
        }

    }
}
