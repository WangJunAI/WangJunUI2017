using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IPermission
    {
        Guid GroupID { get; set; }

        Guid GroupName { get; set; }
        Guid ObjectID { get; set; }

        int ObjectType { get; set; }

        string ObjectTypeName { get; set; }

        Guid OperatorID { get; set; }

        string OperatorName { get; set; }

        int OperatorType { get; set; }

        bool Allow { get; set; } 

    }
}
