using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IComment
    { 
        string Content { get; set; }
        string ContentType { get; set; }
    }
}
