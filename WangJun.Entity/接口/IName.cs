using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IName
    {
        string Name { get; set; }

        string ParentName { get; set; }

        string RootName { get; set; }

        string Path { get; set; }
    }
}
