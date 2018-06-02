﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    public class BasePermission: IPermission
    {
        public Guid  GroupID { get; set; }

        public Guid  GroupName { get; set; }
        public Guid  ObjectID { get; set; }

        public int  ObjectType { get; set; }

        public string  ObjectTypeName { get; set; }

        public Guid  OperatorID { get; set; }

        public string  OperatorName { get; set; }

        public int OperatorType { get; set; }

        public bool  Allow { get; set; } 
 
    }
}
