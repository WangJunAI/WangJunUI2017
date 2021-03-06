﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Config;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.YunQun
{

    public class CommentItem : BaseItem
    {
        public CommentItem()
        {
            this._DbName = CONST.APP.YunQun.DB;
            this._CollectionName = CONST.APP.YunQun.TableComment;
            this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = CONST.APP.YunQun.Code;
            this.AppName = CONST.APP.YunQun.Name;
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

            var yunQun = new YunQunItem();
            yunQun.ID = inst.RootID;
            yunQun = EntityManager.GetInstance().Get<YunQunItem>(yunQun);
            yunQun.LastestCommentTime = DateTime.Now;
            yunQun.Save();
        }

    }
}
