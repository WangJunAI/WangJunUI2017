using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    /// <summary>
    /// EF数据库操作器
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class EntityDbContext<T>: DbContext where T:class
    {
        private EntityDbContext(DbConnection conStr):base(conStr,false)
        {
        }

        /// <summary>
        /// 创建一个实例
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="connectionString"></param>
        /// <returns></returns>
        public static EntityDbContext<T> CreateInstance(string connectionString)  
        {
            return new EntityDbContext<T>(new SqlConnection(connectionString));
        }

        /// <summary>
        /// 数据源
        /// </summary>
         public DbSet<T> List  { get; set; }

        /// <summary>
        /// 保存一个对象
        /// </summary>
        /// <param name="t"></param>
        public void Save(T t)
        {
            if (null != t)
            {
                this.List.Add(t);
                this.SaveChanges();
                this.Dispose();
            }
        }

        /// <summary>
        /// 移除一个对象
        /// </summary>
        /// <param name="t"></param>
        public void Remove(T t)
        {
            if (null != t)
            {
                this.Entry(t).State = EntityState.Deleted;
                this.SaveChanges();
                this.Dispose();

            }
        }

        public void Remove(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                var res = EntityManager.GetInstance<T>().List.Find(new object[] { id });
                if (null != res)
                {
                    this.Entry(res).State = EntityState.Deleted;
                    this.SaveChanges();
                }
                this.Dispose();

            }
        }
    }
}
