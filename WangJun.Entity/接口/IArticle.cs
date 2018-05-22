using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IArticle
    {
        long ID { get; set; }
        string Title { get; set; }

        string Summary { get; set; }

        string Content { get; set; }
        string ContentType { get; set; }



    }
}
