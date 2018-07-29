using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Common;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.DB;
using WangJun.Utility;

namespace WangJun.Entity
{
    /// <summary>
    /// EF数据库操作器
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class EntityDbContext<T>: DbContext where T:class,new()
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
        public static EntityDbContext<T> CreateInstance(string connectionString, DBType dbType=DBType.SQLServer) 
        {
            if (dbType == DBType.SQLServer)
            {
                return new EntityDbContext<T>(new SqlConnection(connectionString));
            }
            else if (dbType == DBType.MySQL)
            {
                return new EntityDbContext<T>(new MySqlConnection(connectionString));
            }
            return null;
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
                var id = t.GetType().GetProperty("ID").GetValue(t).ToString();
                var res = this.List.Find(new object[] { SUID.FromStringToGuid(id) }) as T;
                if (null == res)
                {
                    this.List.Add(t);
                }
                else
                {
                    foreach (var property in res.GetType().GetProperties().Where(p=>p.CanWrite&&p.CanRead))
                    {
                        property.SetValue(res, t.GetType().GetProperty(property.Name).GetValue(t));
                    }

                    this.Entry(res).State = EntityState.Modified;
                }
                this.SaveChanges();
                this.Dispose();
            }
        }

        public T Get(string id)
        {
            return new T();
            var res = this.List.Find(new object[] {SUID.FromStringToGuid(id) }) as T;
            return (null != res) ? res : new T();
        }

        /// <summary>
        /// 移除一个对象
        /// </summary>
        /// <param name="t"></param>
        public void Remove(T t)
        {
            return;
            if (null != t)
            {
                this.Entry(t).State = EntityState.Deleted;
                this.SaveChanges();
                this.Dispose();

            }
        }

        public void Remove(string id)
        {
            return;
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
