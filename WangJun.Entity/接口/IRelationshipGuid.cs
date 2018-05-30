using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public interface IRelationshipGuid
    {
        Guid _GID { get; set; }

        Guid _ParentGID { get; set; }

        Guid _RootGID { get; set; }
    }
}
