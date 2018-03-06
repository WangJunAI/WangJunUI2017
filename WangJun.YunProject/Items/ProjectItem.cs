﻿using MongoDB.Bson;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using WangJun.Config;
using WangJun.DB;
using WangJun.Entity;
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

        public int ReadCount { get; set; }

        public int LikeCount { get; set; }

        public int CommentCount { get; set; }

        public string ImageUrl { get; set; }

        public DateTime PublishTime { get; set; }

        public string PublishMode { get; set; }

        public string Permission { get; set; }

        public ArrayList Milestone  { get;set;}


        /// <summary>
        /// [OK]
        /// </summary>
        public void Save()
        {
            EntityManager.GetInstance().Save<ProjectItem>(this);
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
            foreach (var kv in dict)
            {
                inst.GetType().GetProperty(kv.Key).SetValue(inst, kv.Value);
            }
            inst.Save();
        }
        public void Remove()
        {
            EntityManager.GetInstance().Remove(this);

        }

    }
}
