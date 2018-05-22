using System;
using System.Collections.Generic;
using WangJun.Config;
using WangJun.Entity;
using WangJun.Tools;
using WangJun.Utility;

namespace WangJun.YunNews
{
    /// <summary>
    /// 文档实体 
    /// </summary>
    public class YunNewsItem: BaseItem
    {
        public YunNewsItem()
        {
            this._DbName = CONST.APP.YunNews.DB;
            this._CollectionName = CONST.APP.YunNews.TableNews;
            this.ClassFullName = this.GetType().FullName;
            this.Version = 1;
            this.AppCode = CONST.APP.YunNews.Code;
            this.AppName = CONST.APP.YunNews.Name;
            this.StatusCode = CONST.APP.YunNews.Status.待发布;
            this.Status = CONST.APP.YunNews.Status.GetString(this.StatusCode);
        }

        public string ShowMode { get; set; }

        public string Title { get; set; }

        public string Keyword { get; set; }

        public string Content { get; set; }

        public int ContentLength { get; set; }

        public string PlainText { get; set; }

        public int PlainTextLength
        {
            get
            {
                return (!string.IsNullOrWhiteSpace(this.PlainText)) ? this.PlainText.Length : 0;
            }
        }

        public string Summary
        {
            get
            {
                if (!string.IsNullOrWhiteSpace(this.PlainText))
                {
                    return (150 <= this.PlainText.Length) ? this.PlainText.Substring(0, 150) : this.PlainText;
                }
                return null;
            }
        }
 
        public int ReadCount { get; set; }

        public int LikeCount { get; set; }

        public int HotCount { get; set; }

        public int CommentCount { get; set; }

        public int FavoriteCount { get; set; }

        public string ImageUrl { get; set; }
 
        public DateTime PublishTime { get; set; }

        public string PublishMode { get; set; }
         
        public static YunNewsItem Load(string id)
        {
            var item = new YunNewsItem();
            item.ID = id;
            item = EntityManager.GetInstance().Get<YunNewsItem>(item);
            return item;
        }


        /// <summary>
        /// [OK]
        /// </summary>
        public void Save()
        {
            EntityManager.GetInstance().Save<YunNewsItem>(this);
            ClientBehaviorItem.Save(this, ClientBehaviorItem.BehaviorType.修改, SESSION.Current);
            
        }
        public static void Save(string jsonInput)
        {
            var dict = Convertor.FromJsonToDict2(jsonInput);
            var inst = new YunNewsItem();
            if (dict.ContainsKey("ID") && null != dict["ID"])
            {
                inst.ID = dict["ID"].ToString();
            }
            inst = EntityManager.GetInstance().Get<YunNewsItem>(inst);
            foreach (var kv in dict)
            {
                var property = inst.GetType().GetProperty(kv.Key);
                if (property.CanWrite)
                {
                    property.SetValue(inst, kv.Value);
                }
            }

            ///智能配图
            if(!StringChecker.IsHttpUrl(inst.ImageUrl))
            {
                var imgData= DataSourceBaidu.GetInstance().GetPic(inst.Title)[0] as Dictionary<string,object>;
                inst.ImageUrl = imgData["thumbURL"].ToString();

            }

            inst.Save();

            ///
            var  ar =  BaseArticle.CreateAsHtml();
            ar._ID64 = inst._ID64;
            ar.Title = inst.Title;
            ar.Summary = inst.Summary;
            ar.Content = inst.Content;
            ar.Summary = inst.Summary;

            EntityManager.GetInstance<BaseArticle>().Save(ar);
        }

    }
}
