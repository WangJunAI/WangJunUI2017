using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    interface IRelationshipGuid
    {
        [Key]
        Guid _GID { get; set; }
         
        Guid _ParentGID { get; set; }

        Guid _RootGID { get; set; }
    }
}
