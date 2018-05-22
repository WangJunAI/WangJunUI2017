using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IApp
    {
          long Version { get; set; }

          string AppName { get; set; }

          long AppCode { get; set; }
    }
}
