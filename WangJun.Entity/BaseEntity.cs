using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public class BaseEntity:IRelationshipSQLServer
    {
        [Key]
        public Guid _GID { get; set; }

        public Guid _ParentGID { get; set; }

        public Guid _RootGID { get; set; }
    }
}
