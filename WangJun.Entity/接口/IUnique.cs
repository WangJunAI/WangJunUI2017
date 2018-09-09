using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    interface IUnique
    {
        Guid MD5 { get; }
    }
}
