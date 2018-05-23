using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public class App:IApp
    {
        public long Version { get; set; }

        public string AppName { get; set; }

        public long AppCode { get; set; }
    }
}
