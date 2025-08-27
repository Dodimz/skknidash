<?php

namespace App\Repositories\Traits;

use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Model;

trait ModelRepositoryTraits
{
    public function find($primaryKey)
    {
        return $this->model->find($primaryKey);
    }

    public function findOrFail($primaryKey)
    {
        return $this->model->findOrFail($primaryKey);
    }

    public function create(array $data = [])
    {
        return $this->model->create($data);
    }

    public function findWhere(array $where)
    {
        return $this->model->newQuery()->where($where)->first();
    }

    public function findOrFailWhere(array $where)
    {
        $object = $this->model->newQuery()->where($where)->first();

        return $object ?: abort(404, get_class($this->model).' not found');
    }

    public function updateOrCreate(array $where, array $values = [])
    {
        $object = $this->findWhere($where);

        if (! $object) {
            $object = new $this->model;
        }
        $values = array_merge($where, $values);
        $object->fill($values);
        $object->save();

        return $object;
    }

    public function update($where, array $values = [])
    {
        if (is_array($where)) {
            $object = $this->findWhere($where);
            $values = array_merge($where, $values);
        } else {
            $object = $where instanceof Model ? $where : User::findOrFail($where);
        }

        if (! $object) {
            new Exception('No user found using '.json_encode($where));
        }

        if (! empty($values['password'])) {
            $values['password'] = bcrypt($values['password']);
        }

        $object->fill($values);
        $object->save();

        return $object;
    }
}
