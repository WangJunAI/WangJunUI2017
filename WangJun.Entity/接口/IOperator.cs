using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IOperator
    {
        string CreatorID { get; set; }

        string CreatorName { get; set; }

        string ModifierID { get; set; }

        string ModifierName { get; set; }
        string OwnerID { get; set; }

        string OwnerName { get; set; }
    }
}
