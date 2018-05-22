using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface ITime
    {
          DateTime CreateTime { get; set; }
          DateTime UpdateTime { get; set; }
          DateTime DeleteTime { get; set; }
    }
}
